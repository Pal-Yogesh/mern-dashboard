
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <footer>
        <p>&copy; Website {currentYear}</p>
      </footer>
    </div>
  );
}
