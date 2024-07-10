export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
        <body>
        {/* Layout UI */}
        <main className="bg-base-100">{children}</main>
        </body>
        </html>
    )
}