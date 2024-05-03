import { Input, FormControl } from "native-base";
import { NativeSyntheticEvent, TextInputFocusEventData, TextStyle, Text } from "react-native";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  bgColor?: string;
  inputStyle?: TextStyle;
  estiloTexto?: TextStyle;
  onChangeText?: (text: string) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export function EntradaTexto({ 
  label, 
  placeholder, 
  secureTextEntry = false,
  value,
  bgColor,
  inputStyle, 
  estiloTexto,
  onChangeText,
  onBlur
}: InputProps): JSX.Element {
  return (
    <FormControl mt={3}>
      {label && <Text style={estiloTexto ? estiloTexto : { textAlign: "center", backgroundColor: "#B0C4DE", borderRadius: 20, fontWeight: "bold"}}>{label}</Text>}
      <Input
        placeholder={placeholder}
        size="lg"
        w="100%"
        borderRadius="lg"
        bgColor={bgColor ? bgColor : "gray.100"}
        secureTextEntry={secureTextEntry}
        shadow={3}
        value={value}      
        onBlur={onBlur}
        onChangeText={onChangeText}
        style={[inputStyle, { textAlign: "center" }]}
      />
    </FormControl>
  );
};
