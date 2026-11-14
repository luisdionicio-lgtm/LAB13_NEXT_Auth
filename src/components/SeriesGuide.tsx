const seasons = [
  { n: "01", episodes: 6, title: "El comienzo", description: "Rick despierta en un mundo cambiado y parte hacia Atlanta en busca de su familia.", image: "atlanta" },
  { n: "02", episodes: 13, title: "La granja", description: "El grupo encuentra refugio en la granja de Hershel mientras busca a Sophia.", image: "group" },
  { n: "03", episodes: 16, title: "La prisión", description: "Un nuevo refugio y la aparición de Woodbury ponen a prueba al grupo.", image: "prison" },
  { n: "04", episodes: 16, title: "Caminos separados", description: "La prisión deja de ser segura y los supervivientes buscan un nuevo comienzo.", image: "rick" },
  { n: "05", episodes: 16, title: "La llegada", description: "El camino conduce a Terminus y después a la comunidad de Alexandria.", image: "group" },
  { n: "06", episodes: 16, title: "Nuevas fronteras", description: "Alexandria descubre otras comunidades y enfrenta una amenaza creciente.", image: "rick" },
  { n: "07", episodes: 16, title: "Los Salvadores", description: "Negan impone su dominio y los supervivientes buscan cómo resistir.", image: "final" },
  { n: "08", episodes: 16, title: "La guerra", description: "Las comunidades se unen para enfrentar a los Salvadores.", image: "group" },
  { n: "09", episodes: 16, title: "Un nuevo mundo", description: "El paso del tiempo transforma las comunidades y aparece una amenaza inesperada.", image: "rick" },
  { n: "10", episodes: 22, title: "Los Susurradores", description: "La lucha por proteger los hogares lleva al grupo a enfrentarse a los Susurradores.", image: "daryl" },
  { n: "11", episodes: 24, title: "El último capítulo", description: "La llegada a la Commonwealth abre el último gran capítulo de la serie original.", image: "final" },
];
const episodes = [
  { code: "T01 · E01", title: "Days Gone Bye", text: "El despertar de Rick y el inicio de su viaje hacia Atlanta." },
  { code: "T06 · E09", title: "No Way Out", text: "Los supervivientes se enfrentan a una gran amenaza en Alexandria." },
  { code: "T11 · E24", title: "Rest in Peace", text: "El episodio final reúne los caminos de los supervivientes." },
];
export default function SeriesGuide() {
  return <section id="temporadas" className="series-guide"><div className="series-inner">
    <div className="series-intro"><div><p className="eyebrow"><span className="pulse"/> ARCHIVO DE LA SERIE ORIGINAL</p><h2>El mundo antes.<br/><em>La lucha después.</em></h2></div><p>Recorre los momentos que marcaron a los supervivientes, desde Atlanta hasta el último capítulo. Una guía para volver a explorar su historia.</p></div>
    <div className="series-stats"><div><strong>11</strong><span>TEMPORADAS</span></div><div><strong>177</strong><span>EPISODIOS</span></div><div><strong>2010—2022</strong><span>SERIE ORIGINAL</span></div><a href="https://www.amc.com/blogs/every-season-of-the-walking-dead-series-will-be-available-for-the-first-time-ever-on-amc-january-7--1076213" target="_blank" rel="noreferrer">FUENTE: AMC ↗</a></div>
    <div className="series-banner"><div className="series-banner-image"/><div className="series-banner-text"><p className="eyebrow">ÚLTIMA TEMPORADA / 24 EPISODIOS</p><h3>El final de un camino.<br/><em>El comienzo de otros.</em></h3><p>La temporada 11 cierra la historia principal mientras sus personajes enfrentan nuevas decisiones y el futuro de sus comunidades.</p><a href="#episodios">VER EPISODIOS DESTACADOS ↓</a></div></div>
    <div className="archive-heading"><div><p className="eyebrow">GUÍA DE TEMPORADAS / 01 — 11</p><h3>Once capítulos.<br/><em>Una historia.</em></h3></div><p>Selecciona una temporada para descubrir su punto de partida y la cantidad de episodios.</p></div>
    <div className="season-grid">{seasons.map(s => <details className="season-card" key={s.n}><summary><div className={`season-image season-${s.image}`} /><span className="season-overlay"/><span className="season-content"><span className="season-kicker">TEMPORADA / {s.n}</span><strong>{s.title}</strong><span>{s.episodes} EPISODIOS <b>＋</b></span></span></summary><div className="season-detail"><p>{s.description}</p><span>{s.episodes} EPISODIOS EN LA SERIE ORIGINAL</span></div></details>)}</div>
    <div id="episodios" className="episode-section"><div className="archive-heading"><div><p className="eyebrow">MOMENTOS PARA RECORDAR</p><h3>Episodios <em>destacados.</em></h3></div><p>Tres paradas para recordar el inicio, la resistencia y el final de la serie.</p></div><div className="episode-list">{episodes.map((e,i)=><article className="episode-row" key={e.code}><span className="episode-number">0{i+1}</span><span className="episode-code">{e.code}</span><div><h4>{e.title}</h4><p>{e.text}</p></div><span className="episode-cross">✦</span></article>)}</div><p className="series-footnote">Información de la serie original. Fotografías promocionales © AMC y sus respectivos titulares. Proyecto académico de fans.</p></div>
  </div></section>;
}
