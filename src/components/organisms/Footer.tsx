export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h3>MegaMart</h3>
          <h4>Contact Us</h4>
          <p>WhatsApp: +1 202-918-2132</p>
          <p>Call Us: +1 202-918-2132</p>
          <h4>Download App</h4>
          <div className="store-badges" aria-hidden="true">
            <span>App Store (placeholder)</span>
            <span>Google Play (placeholder)</span>
          </div>
        </section>

        <section>
          <h4>Most Popular Categories</h4>
          <ul>
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Baby Care</li>
            <li>Vegetables & Fruits</li>
            <li>Snacks & Foods</li>
            <li>Dairy & Bakery</li>
          </ul>
        </section>

        <section>
          <h4>Customer Services</h4>
          <ul>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>E-waste Policy</li>
            <li>Cancellation & Return Policy</li>
          </ul>
        </section>

        <section>
          <h4>Institucional</h4>
          <p>Template para TCC de seguranca web com demonstracao de XSS.</p>
          <p>Espaco aberto para logos e selos da loja.</p>
        </section>
      </div>

      <div className="footer-copy">© 2022 All rights reserved. Reliance Retail Ltd.</div>
    </footer>
  );
};