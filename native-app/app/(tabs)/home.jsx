import { View, Image, ScrollView, Text, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useUserData } from "../../context/useProfileData";
import TopVolunteers from "../../components/TopVolunteers";

const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);
  const [activeChart, setActiveChart] = useState(0);
  const { userData, isLoading, error } = useUserData();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [30, 55, 35, 95, 85, 70],
      },
    ],
  };

  const volunteers = [
    {
      id: 1,
      name: "John Doe",
      contributions: 50,
      primaryImage:
        "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "Jane Smith",
      contributions: 40,
      primaryImage:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      name: "Sameer Gupta",
      contributions: 40,
      primaryImage:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDw8QERAQEBAQDw8PEA8QDg8QEg8PFREXFhUSFhUYHSggGBolGxUTITEhJSkrLi4uGB8zODMsQygtMCsBCgoKDg0OGhAQGjAdICYtKy0tLSstLS0tLS0tLS0tLy0vLS0tLS0tLSstLS8tLS8tLS0tLS0tLS0tLS0tLS0vLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAECAwUHBgj/xABGEAACAQMABgYFCQUHBAMAAAAAAQIDBBEFEiExUWEGE0FxgZEHIqGxwSMyQlJygqLR4RRDkrLSM1Nic6PC8BZjk/EkNVT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBQQG/8QAMxEBAAIBAgUCAwcEAgMAAAAAAAECAwQREiExQVEFIhRhcROBkaGx4fAyQsHRM1IVNPH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADT6V6SWtvmMp681+7p+tJPg+xeLPJn12HDymd58Q3x6bJk5xHL5vNXnTyq89VRhBcajc35LGPac3J6vef6K7fV7K6Cv90tZU6W38t1VR5RpU/imeWfUdRP9230iG0aTFHZaulOkF+/fjSpf0kf+Q1Mf3flH+k/CYf8Ar+qba9OLqPz40qi7nCXmnj2G9PVc0f1RE/kztocc9JmHoNG9NLaphVFKhJ/W9aGftL4pHvw+qYr8re2fn0/H/ezy5NFkr05vR05qSUotSi1lNNNNcUzoxMTG8PJMbcpXEoAAAAAAAAAAAAAAAAAAAAAAMN5d06MJVKklCEVtb9y4vkUyZK46za07QtSk2narnunulla4bp0dalSezZ/aVO9rd3L2nz+q9Rvl9tPbH5y6uHSVpztzn8mvtNCzltm9RcFtl+h464Znryei2SI6NpS0bRh9FPnLb7zaMVYZzeZZsxW7Hgid6wjmtc48fYyszVO0sFW2pT3xi/BJlZrWVt5hAuNErfB45S3eZnOPwvFlmjdK3NnP1W0s5lSlthLw7O9GmDU5ME+2eXjsplw0yxz/ABdE0Dp2ldwzH1akV69JvbHmuK5+4+i0urpnrvHKe8OTmwWxTz6eW1PUwAAAAAAAAAAAAAAAAAAAAx3FeFOEpzajCCcpSfYkVvaKVm1uUQmtZtO0OX6d0xVvqySTVNPFKlw/xS/xe4+Y1WqtqL/LtH87u1gw1xV+fdP0do2NJZeHPtlw5IY8UV5yWvulynw8y828K7eVmoV2Tuo6Y4U7scoFJqmJYZwM5heJWdY1zRHFMJ2iValOFSOGsr2pluVoV5w1TVW1qxnCTjKLzCa9z+KK1tbFaLVnaVpit67S6V0d01C7payxGpHCqw+rLiuT7P0PptJqq56bx17w42fDOK23bs2p6mAAAAAAAAAAAAAAAAAAAPBdPtL601awfqwxKrj6U98Y9yW3va4HC9U1O9vsq9I6unosO0cc/ch6GserjrSXryX8MeB4sVNo3l6clt+SdKWe40md1Oi+EC0QiZZFTL8Ku44ETU3YpwKTC8SjziZWheJRqkTG0LxLBlp5RlvtO8L9WepCNSDT3PzTN+VoZ/0ygaHv52Vyp7cJ6tSK+nTe/wCDXcW02ecGSLdu/wBEZsUZabfg6vTqKUVKLTjJKSa3NNZTPq4mJjeHDmNp2lcSgAAAAAAAAAAAAAAAAR7+6VGlUqy3U4SnjjhbvHcUy5Ix0m89oWpWbWisd3KbCEq9dyntbk6s3xbefez5Ku+S+8/WXdnatdoejqPs4+49Vp7MYXU0TWCUmnE2rDOZZowNIqpMqSgRNUxKPUiZWheJRqiMbQ0hFqIxtDSEWqjCzSC3nh8nsGO20lo3hg0zR2Ka7PVfd2f85ml47q1l7HoFf9ZbOm3mVCWqv8t7Y/7l4He9LzceLhnrX9Ozl63Hw5OLy9MdJ4wAAAAAAAAAAAAAAAB5vp9calnqr97VhDwWZv8AlRzvVL8ODbzMR/n/AA9eirvk38Q8n0fp+rKXGWPBL9Th4Y6y6WRsW8yfkab7yr2Z6ZrVSUumb1ZykwNoZytqEWIRahhZrCLUMLNIRKhjZpCLVMLNYYTNZKrR16clxj7f/Z6OtWXSWX0fXGrdSh2VKUtnGUWmvZrHu9KvtmmvmP0ebXV3x7+JdGPoXJAAAAAAAAAAAAAAAAHjPSTL1LZcZ1H5Jfmcf1efbSPnLoaCOdmo0L/Yx75e85eLo9t+rPCQrJKTTkb1lnKTTka1lnMMymaxZTZSUyJsmIYKkjK0rxCNUZjaWkItRmNpaQi1GYWaQxFFky3+avH3nox/0srdUXog8X9D7VRf6czb0/8A9in3/pLPVf8AFb+d3Uz6lxAAAAAAAAAAAAAAAAB4/wBJFP5K3lwqSj/FHP8AtOR6vHsrPz/w9+gn3Wj5NDoWfyS5Skvbn4nJxTye+/Vni8PxIieYkQkaxKkwzQmaRZSYZFMvxI2HMTY2YpzM5stEME5GdpXiEapIxtLSIRpsxleFpCUyhsivFnopyqyt1R+hkNa/ovh1kn/45fFo9Hp0TOor9/6MtXO2Kf53dRPp3FAAAAAAAAAAAAAAAAGi6a2vWWVTG103Gqu6L9b8LkeH1HHx6eflz/D9np0luHLHz5PCaEq/Oj3SXufwPncc83XvCfV2S79otylEdF0JlolEwyxmXiyuy/rC3EjYdQcRsxymVmyYhhnMzmV4hgnIymV4hjKLCWQM99PUpS7tVeOw9FuVWUc5T/R1a5rVqvZCmqa+1N590fadH0nHve1/Ebfi8mvvtWKvfHecsAAAAAAAAAAAAAAAAWVYKUZRksxknFrimsNETETG0pidp3hyS5oStbmUHn5ObWfrQe5+KaZ8jmxzhyTSe36O9jvGSkWju2tRa0U1t7VzFo3jkRO0sMZmUWXmGRTLxZXZd1hbiRsOoRxGyyUyJsnZilMzmVohYVWUAkW0PpeRrjr3UvPZA0xcZkoLdHa/tC88ysOh9EtHfs9pBNYnU+VnxTluXglFeZ9NocH2WGInrPOXG1OTjyTMdOjcnsecAAAAAAAAAAAAAAAAAObekS/tI16VPrF+0t6soR24g9sdd/Redy3vWOf6joL5cf21I51/OP2/29Wk1Vcd/s7T1/X92u0XeY+Tk9n0XwfA+epbbk61oTq9HtW/tQvTvBW3aUfJlu0V1xujY1hubKZI3SoAAy0qWt3F6U3VtbZW+ulTjhfOa9VcOZrado2hSI3Y+idjC4usTlF9WlVlTclrT27PV3uOd78O09np+knLfjtHtj858f5l59XnileGOs/o6lHcfRuQqAAAAAAAAAAAAAAAAAcz6fekTqnO1spJ1FmNW5WGqb3OFPjLi9y5vd7tPpd/df8AB5cufb21c1tdFTq5qVHLVk3JttudRva22+PF7z22nbo80N/b3KyqbfrY2bctpceZ8h6r6TNJnNhj2948fOPl+n06d/Qa+LbY8k8+0+f3/VvbHSWMRnu7JcO84Vb+XUmrYypxltXb2rtLTSLc0RaYYJUJLn3GU45heLQxtPgU2WALo0pPs89haKTKJtDPTt127eXYaVx+VJv4Ybu/jDZHEpcOxd/5Fpvt0RFd2iurh7ZN5k/+eR6dDocmrvtHKO8/zux1Oqpgrz69o/nZ5WrO5oV1XVSUailrQrQeNV8FyxsxwPu8GDHjxRipHtjs+WyZb3vN7Tzdj6BdOoXyVCtq07uK3LZGuktsocH2uPiu3Hkz6ecfOOj04s3Hynq9qeVuAAAAAAAAAAAAAAAcw9J3Tdwc7G1nieNW5rRe2H/ag/rcX2bt+ce7S6ff32+55c+X+2rwWhtE5xUqLZvhB9vNr4HumXlbG9usZjHf2vgTFN+qs2a232VYt9rw/HZ8ReORWebcKq479q9qPmtd6NTLM3w+23jtP+v5ydnS+pWp7cnOPz/dMtbyUdsJd67PFHzWbBl09tskcP6fj0drHlx5Y3pO7Y0tLfWj4xfwZSL+V+FIjpOk+1rvi/gTxwjhlV6RpfWf8MhxwcMsNTS0Poxk+/CRE5DhQbjSE5J5erHgtnmyI4rzwxznxCZ4axvPJAlW7Ft59h29H6Je/uz+2PHf9v1+jman1OteWLnPnt+6HpKq4Rjje5dvaktvvR9Vgw0pXgpG0Q4OTJa1uK07yuouFWDTWeMX2Gu01V33aS9tJ284zhKSxJShUi2pQknlbVua4mkTFoR0dk9HfTNX9PqazUbulHMtyVeC2dZFceK8e3Zy9Rg+zneOj24cvHynq9meZuAAAAAAAAAAAAB5H0j9Kf2C21Kb/wDk19aNL/txXzquOWUlza4M9Gmw/aW59IY5snBHLq45oWw6yTqzy4pt7drnPe229/xZ1Jns8MNvfXWPVjv7Xw5E1r3VtLXo1ZqSiJhMS3EFrwUuK29/aeS1dpbRLXaSk4L1dknua2NLiV+yi8bWjeFuOa84naXptC0Kd1bwqYxNepU1Xj1473jdtWH4nA1XpOni8xEcP0/mzr4NdlmsTvv9WeWhuEn4pM8NvSKdrz+H/wAeqNfbvVSOhn9b8P6kR6PHe/5fuTr5/wCv5pFPQ0Ftk20lltvCSW97DenpWGOu9vv/ANM7a7JPTaHglfudeUnlU5zerF5xCOfV2d2Mn0eHSY8NOHHWI+ji5dRfJbe07t7RomsQzmWr0tPWqY7ILV8e38vA3pG0M7SiQm4tNPDRaY3VhtITjWg01v2SjwMpiay0id2kzWs7iFWlJxnTkp0qi+PHZlNdqbLTEXjaSJmJ3h33ol0gp6QtYV44jP5lannPV1Utse7c0+DRyMuKcdtnRx3i9d25MlwAAAAAAAAAAsrVYwjKcmoxjFylJ7FGKWW34CI3Hzvp/Sk9J386u1RnLUpJ/u6Ec6q8st85M7WOkY6RDm3tx23bSrKNKmlHZhasV8SYjeVJnZq8mzNVEoXEido24UXqy+bLc+EjPJTfmtWdkXSkc1ZcsRXh+uSK15Jmebd9ALnVuJUH82tHMf8AMgm15x1vJHk1mPenF4ejTX2tw+Xv5WnI5j3itOQGm6aVOosamNkqrVGP3vnfhUj0aanFkj5c2Oe3DSXLo0jrbOdu9CrxQt4S3zlHEVzWzWfkU4Oad+TRyZqqtZAuo1nCSa8VxXAiY3TE7NheUI1qezf86L4MyidpadYX+jvpA7C9ipvFCu1Rrp7ovPqVPutvwlIrqMX2lOXWF8N+GzvhyHQAAAAAAAAAADxPpb0s6Gj3Si8Tupqjs3qkvWqPuaSj989WkpxZN/DDUW2pt5cs6O2+FKo979WPct/t9x0bS8UL72trTfBbF8TSsbQpaebCiyq5EiqYQqSKtgZLS4dKpTqx+dTnGa5uLzjx3FbVi0TE901tNZiYduouFSEZxeYzjGcXxi1le8+fmJidpdiJ3jeF6pIhLnnpQuk6tCgt0ISqy+1N6sfJRf8AEdLQ09s2eHV25xV4g97yKNgWMhKjIFrCU3Rtba4Pt2rv7UZ3juvWUHTttiamlsnv+0TSSYds9HGmneaPpSk81aObeq3vcoJasnzcHB97ZytTj4Mk/i9+G/FR6gwagAAAAAAAADjPpovde9oUeyjb6336k3n2QgdPRV2pM+ZeLUz7ohqaC6uhHjGGfvP9Wb9ZY9IaxM2ZKpkoVTAuySK5CDIDIHVOgl/1ljTi3toylRfctsfwyivA4+rpw5Z+fN09NbfHHyeh6w8rdx7pZeddfXM85SqOnHuprU2fwt+J29PXhxVj+c3LzW4rzLTtmzJRshK1kCjCVpArCbi01vTyRKWx0nTU6MmuxKa/53GdeUtJ6PQ+hbSOrdXFs36taiqsV2a9OWH4tT/CYa2u9Ys201vdMOwnNewAAAAAAAAo2BwL0lVNfS90uDoQXd1MPzZ19NG2KHPzTvklfpF/JvvS9pevVnbo1KZqzJSwNxWBMEr8koMgVyAyB7H0cXmKlejn50I1IrnF6r/mj5Hg11eUWevSW5zD213dqnTqVHupwnN/di38Dn1rxWiHttO0TLi0pN7Xtb2t8W953nIUyBa2QKBKjIGPW24ISqwNtZPWpJcnEyt1aR0Y/R/cOlpWzecZqypPmpwlHHm0NRG+KU4Z2vD6Di8nHdFUAAAAAAADDXkBwX0jQcdK3L+t1M1zXUwXvTOvpZ3xQ5+aNryv0htpvwftL16qW6NVk1ZsaeWR1Sypkqq5JFcgMgMgbborddXeUH2Sk6b566aXt1TDU14sUtcE7ZIe16YXWpZVuM9WmvvSWfYmc7S13yw9uonbHLmWTruaZApkJWkCjYSw13jD8CtkwrCeREkw3Gjf7P7zM7dV69EPo1/9laY//ZR8utROX/jn6GP+uPq+hreZxnSSAAAAAAAAIlywOPeluz1bmhXxsqUnTb/xU5Z9015HS0Vt6zV49TX3RLV2U+soR5x1X3rZ+pvPKWHWGprNrZ25x+ZpMqQUxBK/JZCuQGQgyAyBfSquEozW+MoyXenle4iY3jZMTtO72XT65To28U9lScqnhGOF/Oc/RV91pezVW5RDxOTovGpkgMgUyErWyBjrrMX5+RFuiY6o1OoZxK8w9FQ9Sim+yLk+/eR1k6Qx9Ard1NJ23CEp1ZclGDaf8WqNTO2KVsMb3h3i2ZyHQTgAAAAAAAItwgPG9PNDu6s6kYrNWm+upLtcop5iu+Lku9o30+TgvEz0ZZqcVXKNB3WrJwe6e2P2v1XuOpeO7wRLNpSj62st2xPk+JWs9kzCMjRRXJIrkIMgMgMgMgbbTt71kLNb9S0gn9rWlF/yIww04Zt9WuS28V+jUZN2amSAyBTIFrZAowlgtKGZZe6L83wPPM7NojdPv7r5NQ7ZPL7jTFHdS72Xom0W/lruS3/IUnxSalUfdlRXgzza2/Sn3vRpq9bOp2yPA9SaAAAAAAABjrRygNbcUwOPekDo67as7imn1FWWXj9zWby1yTe1c8rgdTS5uOvDPWHhz4+GeKOjW6Ou1UWrLGvjan9JcUaWrtLOJ3UuLBrbDauHavzLRbyrNUOUWt6a71gvuqpkBkCuQGQKZAq5ewCmQKZApkgUyEr4UpS3JvuQ3Eyho575vC+qt/mUm/haKsF1OMHJc3heJnFJtK822hbobRda9uI0ob3tnPHq0qfbJ/BdrNcl6467yrSs3naHc9D6PhQpU6NNYhTioxXbzb5t5b5s49rTaZmXRrWKxtDd0IFUswAAAAAAAACNXogaq/soVIShOKnCacZRksqSfYyYmYneETETG0uT9J+g9a3k6lspVaOc6qy6tLw3yXNbePE6WHVVtyvyn8niyYJrzrzhobbS847JrXxszul+p6Jp4ZRZOhpWi97ceUov4FeCU7wv/abd/Sp+KXxI2scjrrfjS/APccjrbfjS/APccjrrfjS/APccjrrfjS/CPccjrrfjS/CPccjrrfjS/CNrHJTrrfjS/CNrHI66340vwjaxyV/aaC+lT8EvgNrG8MdTStJbm5dy/McEnEg3Gl5vZFai472XikImyXoDoxdXslKMXCk3tr1E9XH+Fb5vu2c0Uy56Y+XfwtTFa/To670c6P0bOkqdKO/DnUltnUlxk/huRy8mW2Sd5e6lIpG0PRUKJmulJAVAAAAAAAAAAMFWhkCDWtgPO6Z6LWly26tGLm/3kcwn4yjv8cmtM16dJUtjrbrDyt56OKW3q69SHKcY1EvLVPRXW27wxnTR2lq6vo+rrdXpvvhOP5mnxtfCnw0+UeXQW5X7yj/qf0k/G08SfDW8rH0JuP7yl5z/AKR8bTxJ8NbytfQy4/vKXnP8h8bTxJ8Nbyp/0dcfXpec/wAh8bTxJ8Nbyf8AR1x9el5z/IfG08SfDW8qrobcf3lLzn+Q+Np4k+Gt5XLoVcf3lLzn/SPjaeJPhreV8eg1y/3lHzqf0j42niT4a3lmp9ALh761Jdym/gh8bXxJ8Nby2Fp6N0/7S5k+VOko+2TfuKTrp7VWjTeZem0T0JsqLUlR6ySx61Z9ZtXaov1U+5Hnvqclu+30a1w0r2eqoWxg1T6NDAGdICoAAAAAAAAAAAAWyimBhqWyYESrZ8gItSz5ARp2XIDBKy5AYnY8gLXY8gH7DyAuVjyAyRsuQGeFlyAkU7PkBLpWfICVTtcASIwSAuAAAAAAAAAAAAAAAAAAFrppgY5W6AxytEBY7IC39iAfsQFysgL1aIC+NugMippAX4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z",
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#2E6A8A",
    backgroundGradientFromOpacity: 0.7,
    backgroundGradientTo: "#1B3A4B",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    style: {
      borderRadius: 16,
    },
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const chartWidth = screenWidth;
    const newActiveChart = Math.round(contentOffsetX / chartWidth);
    setActiveChart(newActiveChart);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row gap-0 mx-4 mt-4 mb-2">
          <Image
            source={{ uri: userData.primaryImage }}
            className="h-14 w-14 rounded-full mr-2"
          />
          <View className="flex justify-start items-start gap-0">
            <Text className="text-lg font-extrabold text-center text-slate-400">
              Welcome,
            </Text>
            <Text className="text-lg text-center font-semibold">
              {userData.name}
            </Text>
          </View>
        </View>

        <View className="px-4">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ flexDirection: "row" }}
          >
            <View style={{ width: screenWidth, paddingHorizontal: 0 }}>
              <LineChart
                data={data}
                width={screenWidth - 35}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={{
                  borderRadius: 16,
                  marginVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              />
            </View>

            <View style={{ width: screenWidth }}>
              <BarChart
                data={barData}
                width={screenWidth - 35}
                height={200}
                chartConfig={chartConfig}
                style={{
                  borderRadius: 16,
                  marginVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  marginLeft: -30,
                }}
              />
            </View>
          </ScrollView>

          <View className="flex-row justify-center">
            {[0, 1].map((index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  activeChart === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>

        {userData.role === "admin" && <TopVolunteers volunteers={volunteers} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
