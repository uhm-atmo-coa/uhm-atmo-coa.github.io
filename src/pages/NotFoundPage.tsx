import PagePlaceholder from '../components/PagePlaceholder';

export default function NotFoundPage() {
  return (
    <PagePlaceholder
      description="The requested route does not map to one of the starter pages yet. Use the navigation above to return to a valid page."
      fileHint="src/utils/routes.ts"
      title="Page not found"
    />
  );
}
