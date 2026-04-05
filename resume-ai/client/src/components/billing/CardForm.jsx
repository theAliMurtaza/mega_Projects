export default function CardForm({ form, onChange }) {
  const set = (k) => (e) => onChange({ ...form, [k]: e.target.value });

  const fmtCard = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 16);
    onChange({ ...form, number: v.replace(/(.{4})/g, "$1 ").trim() });
  };

  const fmtExpiry = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    onChange({ ...form, expiry: v });
  };

  return (
    <div className="card">
      <div className="card-title">Card Details</div>

      <div className="form-group">
        <label>Cardholder Name</label>
        <input value={form.name} placeholder="Jane Doe" onChange={set("name")} />
      </div>

      <div className="form-group">
        <label>Card Number</label>
        <input value={form.number} placeholder="1234 5678 9012 3456" maxLength={19} onChange={fmtCard} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Expiry</label>
          <input value={form.expiry} placeholder="MM/YY" maxLength={5} onChange={fmtExpiry} />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input value={form.cvv} placeholder="•••" maxLength={4}
            onChange={(e) => onChange({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 text-[11px] text-[#2a3040]">
        <span>🔒</span>
        <span>Simulated payment — no real charge. Demo purposes only.</span>
      </div>
    </div>
  );
}
