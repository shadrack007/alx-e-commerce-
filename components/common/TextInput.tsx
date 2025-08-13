import { KeyboardTypeOptions, TextInput } from "react-native";

interface SearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
}

const SearchField = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: SearchFieldProps) => {
  return (
    <TextInput
      className="py-4 px-2 rounded-md border-2 focus:border-primary"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

export default SearchField;
