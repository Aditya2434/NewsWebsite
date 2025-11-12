export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-gray-950 text-white py-8 mt-12 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">
            Powered by NewsAPI.org
          </p>
        </div>
      </div>
    </footer>
  );
}

