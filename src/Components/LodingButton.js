import { Button } from "antd";
import { useSelector } from "react-redux";

const LoadingButton = ({
    className,
    size,
    type,
    htmlType,
    disabled = false,
    children
}) => {
    const loader = useSelector((state) => state.loader.value);
    return (
        <Button
            className={className}
            size={size}
            type={type}
            htmlType={htmlType}
            disabled={disabled || loader}
        >
            {children}
        </Button>
    )
}

export default LoadingButton