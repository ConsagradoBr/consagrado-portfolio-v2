import Link from "next/link";

const projects = [
  {
    title: "ERP para Usinagem Industrial (TCC)",
    stack: "JavaScript, PHP, SQL",
    items: [
      "Sistema completo de gestão para indústria de usinagem: ordens de serviço, estoque, fornecedores e relatórios.",
      "Repositório público: github.com/ConsagradoBr/tcc-erp-usinagem",
    ],
  },
  {
    title: "Portfólio Interativo (QFC OS)",
    stack: "HTML, CSS, JavaScript",
    items: [
      "Portfólio no estilo terminal/OS com navegação entre páginas, projetos e stack técnica.",
      "Publicado via GitHub Pages: consagradobr.github.io",
    ],
  },
  {
    title: "Automação Administrativa com n8n",
    stack: "n8n, CSV, integrações",
    items: [
      "Fluxos de automação para rotinas administrativas, alertas, organização de CSV e integração entre sistemas.",
    ],
  },
];

const experiences = [
  {
    company: "AMP — Usinagem Industrial Ltda",
    role: "Auxiliar Administrativo",
    period: "03/2025 – 11/2025",
    items: [
      "Controle de compras e acompanhamento de contratos com fornecedores e serviços terceirizados.",
      "Apoio ao setor financeiro: controle de despesas, análise de faturas e emissão de relatórios.",
      "Monitoramento de orçamentos de serviços externos e controle de estoque de materiais.",
      "Atendimento interno e mediação de solicitações relacionadas a ordens de serviço.",
      "Uso avançado do Pacote Office (Excel) e contato direto com sistemas de gestão (ERP).",
    ],
  },
  {
    company: "J Rufino Serviços Administrativos Ltda",
    role: "Almoxarife / Apoio Operacional",
    period: "12/2021 – 05/2022",
    items: [
      "Controle de entrada e saída de materiais no almoxarifado.",
      "Participação em atividades operacionais nas áreas de encanamento e pintura.",
      "Apoio administrativo no escritório com visão ampla de processos operacionais.",
    ],
  },
  {
    company: "ADRA — Agência Adventista de Recursos Assistenciais",
    role: "Voluntário — Apoio Administrativo e Técnico",
    period: "07/2020 – 03/2021",
    items: [
      "960 horas de atuação em projetos de ajuda humanitária e demandas sociais emergenciais.",
      "Suporte em informática e organização de processos internos.",
    ],
  },
];

const tech = [
  ["Front-end", "HTML, CSS, JavaScript, Tailwind CSS, responsividade, GitHub Pages"],
  ["Automação", "n8n, fluxos administrativos, integração entre sistemas, CSV"],
  ["Back-end / Dados", "PHP, Java, Python, SQL, CRUD, modelagem de banco de dados"],
  ["Versionamento", "Git, GitHub (17 repositórios públicos)"],
  ["Sistemas", "Bash, Linux básico, ERP (familiaridade operacional)"],
  ["Office / Design", "Excel Avançado, Word, PowerPoint, CorelDRAW, Photoshop"],
  ["Manutenção", "Montagem e manutenção de hardware e software"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function CurriculoPage() {
  return (
    <main className="min-h-screen bg-[#e9edf1] px-4 py-8 text-[#3f444c] print:bg-white print:p-0">
      <div className="mx-auto max-w-[840px] rounded-[18px] bg-white px-10 py-10 shadow-2xl shadow-black/15 print:max-w-none print:rounded-none print:px-[54px] print:py-[44px] print:shadow-none">
        <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
          <Link href="/" className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#1f5a87] hover:opacity-70">
            ← voltar ao QFC OS
          </Link>
          <a href="/curriculo.pdf" className="rounded-full bg-[#1f3d5d] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#16304b]">
            baixar PDF
          </a>
        </div>

        <header className="mb-7 border-b-[3px] border-[#2f4858] pb-5 text-center">
          <h1 className="text-[34px] font-extrabold tracking-[-0.04em] text-[#1f3d5d] print:text-[30px]">
            Quésede Filipe Constantino
          </h1>
          <p className="mt-2 text-[13px] text-[#777f89]">
            Mogi Mirim – SP · (19) 99728-7737 · quesede.filipe@gmail.com
          </p>
          <p className="mt-1 text-[13px] font-medium text-[#1f5a87]">
            consagradobr.github.io · github.com/ConsagradoBr
          </p>
        </header>

        <Section title="Objetivo profissional">
          <p>
            Atuar em Desenvolvimento de Sistemas e Automação de Processos, com foco em construção de soluções práticas e funcionais para ambientes administrativos e operacionais. Experiência aplicada em front-end, automação com n8n e desenvolvimento de sistemas internos (ERP), aliada à vivência real em processos de compras, contratos e financeiro.
          </p>
        </Section>

        <Section title="Formação acadêmica">
          <p><strong>Técnico em Desenvolvimento de Sistemas</strong></p>
          <p>ETEC / Escola Técnica · <em>Conclusão: 1º semestre de 2026</em></p>
          <p><em>TCC: Sistema ERP para usinagem industrial (JavaScript, PHP, SQL)</em></p>
          <p className="mt-2"><strong>Ensino Médio Completo</strong></p>
          <p>UNASP</p>
        </Section>

        <Section title="Projetos">
          {projects.map((project) => (
            <article key={project.title} className="cv-item">
              <p><strong>{project.title}</strong> <span>— {project.stack}</span></p>
              <ul>{project.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </Section>

        <Section title="Experiência profissional">
          {experiences.map((exp) => (
            <article key={exp.company} className="cv-item avoid-break">
              <p><strong>{exp.company}</strong> <span>| {exp.role} · {exp.period}</span></p>
              <ul>{exp.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </Section>

        <Section title="Conhecimentos técnicos">
          <div className="grid gap-1.5">
            {tech.map(([label, value]) => (
              <p key={label}><strong>{label}:</strong> {value}</p>
            ))}
          </div>
        </Section>

        <Section title="Idiomas">
          <p><strong>Português:</strong> Nativo</p>
          <p><strong>Inglês:</strong> Básico a intermediário (leitura técnica)</p>
          <p><strong>Japonês:</strong> Iniciante</p>
        </Section>

        <Section title="Competências">
          <p>
            Capacidade de construir soluções funcionais de forma autônoma — desde a prototipagem até a entrega. Perfil generalista com boa transição entre áreas técnicas e administrativas. Facilidade com aprendizado técnico aplicado a problemas reais. Organização, atenção a detalhes e visão analítica de processos.
          </p>
        </Section>
      </div>

      <style>{`
        .cv-section { margin-top: 18px; }
        .cv-section h2 {
          margin-bottom: 8px;
          border-bottom: 1.5px solid #8aa0aa;
          padding-bottom: 4px;
          color: #2f4858;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .cv-section p, .cv-section li {
          font-size: 12.5px;
          line-height: 1.35;
        }
        .cv-section strong { color: #2f4858; font-weight: 800; }
        .cv-section span, .cv-section em { color: #6d737c; }
        .cv-item { margin-top: 8px; }
        .cv-item ul { margin-top: 3px; padding-left: 18px; }
        .cv-item li { list-style: none; position: relative; }
        .cv-item li::before { content: "–"; position: absolute; left: -14px; color: #6d737c; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        @media print {
          @page { size: A4; margin: 0; }
          .cv-section { margin-top: 14px; }
          .cv-section p, .cv-section li { font-size: 10.7px; line-height: 1.25; }
          .cv-section h2 { font-size: 11.4px; margin-bottom: 6px; }
          .cv-item { margin-top: 6px; }
        }
      `}</style>
    </main>
  );
}
