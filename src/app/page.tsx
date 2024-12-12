export default function RootPage() {
  // Redirect to the HTML page for non-app routes
  return (
    <iframe 
      src="/index.html"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  )
} 