export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 font-bold">
          <div className="size-8 rounded-full bg-primary" />
          <span>ClipFarm</span>
        </div>
        <div className="size-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
      </div>
    </div>
  )
}

