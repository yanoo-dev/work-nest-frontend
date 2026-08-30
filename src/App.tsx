export default function App() {
  return (
    <main className="min-h-screen bg-bg-subtle px-6 py-10 text-text">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-xl border border-border-subtle bg-bg p-6 shadow-md">
          <p className="text-caption text-text-muted">Work Nest React</p>
          <h1 className="mt-2 text-heading-md text-text-strong">
            안전관리 업무 플랫폼 전환 시작
          </h1>
          <p className="mt-3 max-w-2xl text-body-md text-text-muted">
            Angular로 구현했던 업무 흐름을 React, TypeScript, Tailwind CSS
            기준으로 다시 구성한다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-border-subtle bg-bg p-4 shadow-sm">
            <p className="text-caption text-text-muted">Frontend</p>
            <strong className="mt-1 block text-title-md text-text-strong">
              React + Vite
            </strong>
          </article>
          <article className="rounded-lg border border-border-subtle bg-bg p-4 shadow-sm">
            <p className="text-caption text-text-muted">Style</p>
            <strong className="mt-1 block text-title-md text-primary">
              Tailwind Theme
            </strong>
          </article>
          <article className="rounded-lg border border-border-subtle bg-bg p-4 shadow-sm">
            <p className="text-caption text-text-muted">Backend</p>
            <strong className="mt-1 block text-title-md text-text-strong">
              NestJS API
            </strong>
          </article>
        </div>

        <button
          type="button"
          className="h-10 w-fit rounded-md bg-primary px-4 text-action-sm text-text-inverse shadow-sm hover:bg-primary-hover"
        >
          테마 적용 확인
        </button>
      </section>
    </main>
  )
}
