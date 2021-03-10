import React, { FC } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

interface Props {
  mindex: number;
  mtitle: string;
  monPress?: ()=>void;
}

const CDropdownItem : FC<Props> = (props) => {
  const render: ()=>React.ReactElement = () => {
    return(              
      <TouchableNativeFeedback 
        onPress={(e) => {
          if(props.monPress)
            props.monPress();
        }}
        style={{
          height: 40, justifyContent: "center",
          paddingHorizontal: 20
        }}
      >
        <Text style={{fontSize: 15}}>{props.mtitle}</Text>
      </TouchableNativeFeedback>      
    );
  }

  return render();
}

export default CDropdownItem;