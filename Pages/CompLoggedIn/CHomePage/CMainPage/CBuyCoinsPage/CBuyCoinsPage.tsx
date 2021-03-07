import React, { FC } from "react";
import { ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, List, Text } from "react-native-paper";
import {FontAwesome5} from "@expo/vector-icons";

const CBuyCoinsPage: FC = () => {
  const frender: ()=>React.ReactElement = () => {
    const fbuildBuyCoinsBtn: (coins:number, rupees: number, key?: number)=>React.ReactElement = (coins, rupees, key) => {
      return(     
        <Card 
          key={key} style={{padding: 10, marginVertical: 5}} 
          onPress={() => {ToastAndroid.show(`Bought ${coins} coins for ${rupees} rupees`, ToastAndroid.SHORT)}}
        >
          <List.Item            
            title={(
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <FontAwesome5 name="coins" size={30} />                

                <View style={{width: 10}} />

                <Text style={{fontSize: 25}}>{`${coins}`}</Text>
              </View>
            )} 
            description={`${coins} coins will be added to your account`}              
            right={(_) => (            
              <View style={{justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{`Rs. ${rupees}`}</Text>
              </View>            
            )}
          />
        </Card>                  
      );      
    };

    let buyCoinsBtns: React.ReactElement[] = [];
    for(let i: number = 1; i <= 10; i++)
      buyCoinsBtns.push(fbuildBuyCoinsBtn(i * 10, i * 100, i));    

    return(
      <View style={{width: "100%", height: "100%", padding: 10}}>
        <ScrollView>
          {buyCoinsBtns}
        </ScrollView>
      </View>
    );
  };

  return frender();
};

export default CBuyCoinsPage;