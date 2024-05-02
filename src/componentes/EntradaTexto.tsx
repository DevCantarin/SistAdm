import { Input, FormControl } from "native-base";
import { NativeSyntheticEvent, TextInputFocusEventData, ViewStyle } from "react-native";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  bgColor?: string;
  inputStyle?: ViewStyle;
  estiloTexto?: ViewStyle;
  onChangeText?: (text: string) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void; // Alteração aqui
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
      {label && <FormControl.Label style={estiloTexto ? estiloTexto : null}>{label}</FormControl.Label>}
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
