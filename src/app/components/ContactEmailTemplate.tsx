// ✅ Basic HTML sanitization to prevent injection
function sanitize(input: string) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ✅ JSX Email Template
export function ContactEmailTemplate({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "1.4" }}>
      <p><strong>Name:</strong> {sanitize(name)}</p>
      <p><strong>Email:</strong> {sanitize(email)}</p>
      <p><strong>Message:</strong></p>
      <div style={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
        {sanitize(message)}
      </div>
    </div>
  );
}