<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep site copy and business details in `src/data/content.ts`, and media slot definitions in `src/data/images.ts`, so client updates remain centralised.
- Use TanStack Start file routes and route `head()` rather than React Router or Helmet, because this project is a TanStack Start application.
- Use generated architectural imagery as illustrative placeholders only, never present it as photographed client work.
