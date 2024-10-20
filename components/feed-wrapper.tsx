
type Props = {
    children: React.ReactNode;
};

export const FeedWrapper = ({ children }: Props) => {
    return(
        <div className="flex-1 relative tp-0 pb-10">
            {children}
        </div>
    );
};