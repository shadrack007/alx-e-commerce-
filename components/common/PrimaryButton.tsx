import { Text, TouchableOpacity } from "react-native";

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  disabled: boolean;
}

const PrimaryButton = ({
  text,
  onPress,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary py-4 rounded-lg"
      disabled={disabled}
    >
      <Text className="text-center text-lg text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
