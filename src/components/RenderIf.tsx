import type { ReactNode } from "react";

interface RenderIfProps {
    condition: boolean;

    children: ReactNode;

    fallback?: ReactNode;
}

const RenderIf = ({ condition, children, fallback }: RenderIfProps) => {
    return <>{condition ? children : fallback}</>;
};

export default RenderIf;