import { useMemo, useState } from "react";
import { projects, categories, links } from "./data/projects.js";

/* ---------- Öne çıkan proje ---------- */

function Featured({ p }) {
  return (
    <div className="featured">
      <div className="featured-main">
        <span className="badge">
          <span className="pulse" /> Şu an üzerinde çalışıyorum
        </span>
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
        <ul className="stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="featured-side">
        <p className="eyebrow" style={{ color: "#8f958a" }}>
          Nasıl çalışıyor
        </p>
        <ul className="stack" style={{ margin: 0 }}>
          <li>Kümeleme ile oyuncu segmentleri</li>
          <li>Pozisyon bazlı benzerlik</li>
          <li>Canlı API verisi</li>
        </ul>
        <div className="side-links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer">
              <span>Uygulamayı aç</span>
              <span>↗</span>
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noreferrer">
            <span>Kaynak kodu</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sayfa ---------- */

export default function App() {
  const [active, setActive] = useState("all");
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const shown = active === "all" ? rest : rest.filter((p) => p.cat === active);

  const counts = useMemo(() => {
    const c = { all: rest.length };
    rest.forEach((p) => (c[p.cat] = (c[p.cat] || 0) + 1));
    return c;
  }, [rest]);

  return (
    <div className="wrap">
      <header className="masthead">
        <div className="masthead-top">
          <p className="eyebrow">Hakan Güneş</p>
          <p className="eyebrow">Ankara, TR · {projects.length} proje</p>
        </div>

       <h2 className="display headline">
  Portfolyoma hoş geldiniz. <br />
  Veri bilimi ile <br />
  <em>veriyi</em> 
  <br />
  <em>karara</em> <br /> çeviriyorum.
</h2>

        <p className="lede">
          Karmaşık veri setlerinden iş kararına dönüşen sonuçlar çıkarıyorum: müşteri
          segmentasyonu, tahmin modelleri, öneri sistemleri ve spor analitiği ile ilgili projeler geliştiriyorum.
        </p>

        <div className="actions">
          <a className="btn primary" href="#projeler">
            Projeler
          </a>
          <a className="btn" href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <h2>Öne çıkan</h2>
          <p className="section-note">canlı</p>
        </div>
        {featured && <Featured p={featured} />}
      </section>

      <section className="section" id="projeler">
        <div className="section-head">
          <h2>Tüm projeler</h2>
          <p className="section-note">
            {shown.length} / {rest.length} görüntüleniyor
          </p>
        </div>

        <div className="filters">
          <button
            className="chip"
            aria-pressed={active === "all"}
            onClick={() => setActive("all")}
          >
            Hepsi ({counts.all})
          </button>
          {categories.map((c) =>
            counts[c.key] ? (
              <button
                key={c.key}
                className="chip"
                aria-pressed={active === c.key}
                onClick={() => setActive(active === c.key ? "all" : c.key)}
              >
                {c.short} ({counts[c.key]})
              </button>
            ) : null
          )}
        </div>

        <div className="rows">
          {shown.map((p, i) => (
            <a
              className="row"
              key={p.name}
              href={p.live || p.repo}
              target="_blank"
              rel="noreferrer"
            >
              <span className="row-idx">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="row-title">
                  {p.name}
                  {p.live && <span className="live-tag">CANLI</span>}
                </h3>
                <p className="row-blurb">{p.blurb}</p>
              </div>
              <span className="row-stack">{p.stack.join(" · ")}</span>
              <span className="row-meta">
                {p.year} ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Hakan Güneş</span>
        <span>
          <a href={links.github} target="_blank" rel="noreferrer">
            github.com/HakanGnes
          </a>
          {"  ·  "}
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </span>
      </footer>
    </div>
  );
}
