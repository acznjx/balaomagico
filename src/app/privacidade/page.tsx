// src/app/privacidade/page.tsx

import type { Metadata } from "next";
import { CONTACT, SITE } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade e cookies",
  description: `Como a ${SITE.name} trata os seus dados pessoais e quais informações este site guarda no seu navegador.`,
  alternates: { canonical: "/privacidade" },
};

/** Data da última revisão do texto. Atualize sempre que mudar a política. */
const ATUALIZADO_EM = "13 de outubro de 2026";

/* -------------------------------------------------------------------------- */
/* Subcomponentes                                                             */
/* -------------------------------------------------------------------------- */

function Secao({ id, titulo, children }: { id?: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-brand-blue/10 pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-black leading-tight tracking-tight text-brand-blue">
        {titulo}
      </h2>
      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-700 [&_li]:pl-1 [&_strong]:font-bold [&_strong]:text-brand-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

const linkClass = "font-bold text-brand-blue underline decoration-brand-yellow decoration-2 underline-offset-4 hover:decoration-brand-blue";

/* -------------------------------------------------------------------------- */
/* Página                                                                     */
/* -------------------------------------------------------------------------- */

export default function PrivacidadePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-blue text-white">
        <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-20">
          <h1 className="reveal max-w-3xl text-balance text-[clamp(2.2rem,1.4rem+3.5vw,3.75rem)] font-black leading-[1.04] tracking-tight">
            Política de privacidade e cookies
          </h1>
          <p className="reveal mt-5 max-w-xl text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-white/80 [--reveal-delay:100ms]">
            Explicamos aqui, de forma simples, quais dados recebemos, para que usamos e quais são os seus direitos.
          </p>
          <nav aria-label="Seções da política" className="reveal mt-8 flex flex-wrap gap-2 [--reveal-delay:200ms]">
            {[
              { label: "Privacidade", href: "#privacidade" },
              { label: "Cookies", href: "#cookies" },
              { label: "Seus direitos", href: "#direitos" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold transition-colors hover:border-white hover:bg-white hover:text-brand-blue"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <svg
          className="absolute inset-x-0 -bottom-px h-[clamp(28px,5vw,64px)] w-full text-white"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 64 V40 C 360 0 1080 0 1440 40 V64 Z" fill="currentColor" />
        </svg>
      </section>

      <article className="mx-auto max-w-3xl space-y-10 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:pb-28">
        <p className="text-sm font-bold text-slate-500">Última atualização: {ATUALIZADO_EM}</p>

        <Secao id="privacidade" titulo="Quem somos">
          <p>
            A <strong>{SITE.name}</strong> aluga brinquedos para festas infantis em {CONTACT.serviceArea}. Somos
            responsáveis pelos dados pessoais que você compartilha conosco, conforme a Lei Geral de Proteção de Dados
            (LGPD, Lei nº 13.709/2018).
          </p>
        </Secao>

        <Secao titulo="Quais dados recebemos">
          <p>
            <strong>Este site não tem cadastro, login nem formulário.</strong> Você pode navegar por ele sem informar
            nenhum dado pessoal.
          </p>
          <p>
            Quando você clica em um botão do WhatsApp ou do Instagram, a conversa acontece nesses aplicativos. Nela,
            podemos receber:
          </p>
          <ul>
            <li>seu nome e número de telefone (ou perfil do Instagram);</li>
            <li>data, horário e endereço da festa;</li>
            <li>os brinquedos de interesse e outras informações que você escolher enviar.</li>
          </ul>
          <p>
            O WhatsApp e o Instagram pertencem à Meta e seguem as políticas de privacidade dela. Assim como qualquer
            site, a empresa de hospedagem pode registrar dados técnicos de acesso (como endereço IP e tipo de
            navegador) para manter o site seguro e funcionando.
          </p>
        </Secao>

        <Secao titulo="Para que usamos">
          <ul>
            <li>responder às suas dúvidas e enviar orçamentos;</li>
            <li>reservar a data e combinar a entrega, a montagem e a retirada dos brinquedos;</li>
            <li>calcular o frete de acordo com o endereço da festa;</li>
            <li>cumprir obrigações legais, como a emissão de recibos ou notas.</li>
          </ul>
          <p>
            <strong>Não vendemos nem compartilhamos seus dados</strong> com terceiros para fins de propaganda. Também
            não enviamos mensagens promocionais sem que você peça.
          </p>
        </Secao>

        <Secao titulo="Por quanto tempo guardamos">
          <p>
            Mantemos as informações da reserva apenas pelo tempo necessário para realizar a festa e atender eventuais
            obrigações legais. Depois disso, elas podem ser apagadas a qualquer momento a seu pedido.
          </p>
        </Secao>

        <Secao id="cookies" titulo="Cookies">
          <p>
            Cookies são pequenos arquivos que os sites guardam no seu navegador.{" "}
            <strong>Este site não usa cookies</strong>: não tem ferramentas de propaganda, rastreamento ou estatísticas
            de visitas. Por isso, não mostramos aquele aviso pedindo para aceitar cookies.
          </p>
          <p>
            A única informação guardada no seu navegador é um registro temporário (chamado <em>sessionStorage</em>)
            que lembra que você já viu a animação de abertura, para que ela não se repita a cada página. Ele não
            identifica você, não é enviado para nós e é apagado automaticamente quando você fecha a aba.
          </p>
          <p>
            Se um dia passarmos a usar cookies (por exemplo, para medir visitas), esta página será atualizada e você
            poderá escolher se aceita ou não antes de qualquer cookie ser criado.
          </p>
        </Secao>

        <Secao id="direitos" titulo="Seus direitos">
          <p>Pela LGPD, você pode pedir a qualquer momento:</p>
          <ul>
            <li>a confirmação de que temos dados seus e uma cópia deles;</li>
            <li>a correção de dados incompletos ou desatualizados;</li>
            <li>a exclusão dos seus dados, quando não houver obrigação legal de mantê-los;</li>
            <li>informações sobre com quem seus dados foram compartilhados.</li>
          </ul>
          <p>
            Para fazer qualquer um desses pedidos, fale com a gente pelo{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
              WhatsApp {CONTACT.formattedPhone}
            </a>{" "}
            ou pelo{" "}
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Instagram {CONTACT.instagramUser}
            </a>
            . Você também pode registrar uma reclamação na Autoridade Nacional de Proteção de Dados (ANPD).
          </p>
        </Secao>

        <Secao titulo="Mudanças nesta política">
          <p>
            Podemos atualizar este texto quando o site ou a forma de atendimento mudarem. A data da última atualização
            fica sempre no início da página.
          </p>
        </Secao>
      </article>
    </>
  );
}
