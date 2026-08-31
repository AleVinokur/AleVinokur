# Alejandro Vinokur — Portfolio

Portfolio for Alejandro Vinokur, a Software Engineer with a backend focus on APIs, third-party integrations, asynchronous workflows, and production reliability.

## Live site

[alevinokur.github.io/AleVinokur](https://alevinokur.github.io/AleVinokur/)

## Portfolio structure

- Backend-focused hero and professional proof
- Current experience at Avature plus previous roles
- Professional and prototype case studies organized by business model and maturity
- Applied AI work clearly labeled as POC/prototype
- Selective freelance availability
- Accessible contact form prepared for Formspree delivery

The canonical GitHub Pages source is the root `index.html`. Legacy Laravel files are not included in the Pages deployment artifact.

## Local preview

Serve the repository root with any static HTTP server. For example:

```bash
npx serve .
```

## Validation

```bash
npm run test:static
```

The validation checks public claims, local assets, form fields, accessibility hooks, sitemap URLs, and the downloadable PDF.

## Contact form

The form posts to a Formspree form ID and uses progressive client-side validation. Before deployment:

1. Create or select the Formspree form.
2. Replace `FORM_ID` in `index.html` with the public form ID.
3. Restrict submissions to `alevinokur.github.io` in Formspree.
4. Keep Formspree spam protection enabled.

No email password or private API credential belongs in this repository.

## Contact

- [Email](mailto:alevinokur@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/alejandro-vinokur-758596165/)
- [GitHub](https://github.com/AleVinokur)
