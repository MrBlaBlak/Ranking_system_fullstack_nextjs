export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-base-100">{children}</div>
    )
}