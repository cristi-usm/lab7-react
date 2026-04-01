// ─── Stiluri comune ───────────────────────────────────────────────────────────

export const sel_css = {
  background: "#1c1d1f",
  border: "1px solid #2a2b2e",
  borderRadius: 4,
  padding: "9px 12px",
  color: "#e8e6e1",
  fontFamily: "'Inter',sans-serif",
  fontSize: 13,
  outline: "none",
  width: "100%",
  cursor: "pointer",
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#111213;}
  ::-webkit-scrollbar-thumb{background:#2a2b2e;border-radius:2px;}
  input:focus,select:focus{border-color:#e8610a!important;outline:none;}
  input::placeholder{color:#3c3a36;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  @keyframes slideIn{from{opacity:0;transform:translateX(8px);}to{opacity:1;transform:translateX(0);}}
  .marca-card:hover{border-color:#383a3d!important;transform:translateY(-2px)!important;}
  .marca-card.sel{border-color:#e8610a!important;background:#e8610a0f!important;}
  .model-card:hover{border-color:#383a3d!important;}
  .model-card.sel{border-color:#e8610a!important;background:#e8610a0f!important;}
  .piesa-card{transition:border-color .15s,background .15s;}
  .piesa-card:hover{border-color:#383a3d!important;}
  .piesa-card.sel{border-color:#e8610a!important;background:#e8610a08!important;}
  .qty-btn:hover{background:#e8610a!important;color:#fff!important;}
  .btn-next:hover:not([disabled]){background:#c9520a!important;}
  .btn-back:hover{border-color:#5c5a56!important;color:#9a9790!important;}
  .cat-pill{cursor:pointer;transition:all .15s;}
`;
