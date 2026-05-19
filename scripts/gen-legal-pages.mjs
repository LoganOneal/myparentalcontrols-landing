import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const PAGES = [
  { slug: 'privacy', title: 'Privacy Policy' },
  { slug: 'tos', title: 'Terms of Service' },
  { slug: 'sweepstakes', title: 'Sweepstakes Official Rules' },
];

for (const { slug, title } of PAGES) {
  const content = await readFile(join(ROOT, `docs/research/legal-${slug}-content.html`), 'utf8');
  const escaped = content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const tsx = `import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Cal AI | ${title}",
  description: "Download Today",
};

const HTML = \`${escaped}\`;

export default function Page() {
  return (
    <LegalLayout>
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </LegalLayout>
  );
}
`;
  const dir = join(ROOT, `src/app/${slug}`);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'page.tsx'), tsx);
  console.log('wrote', slug);
}
