// Política de privacidade: texto único em pt / en / es.
// A página em português é gerada daqui; as traduções alimentam o dicionário (tr-src.mjs).
import { contact } from './data.mjs';

const mail = `<a href="mailto:${contact.email}">${contact.email}</a>`;

export const UPDATED = ['Última atualização: 16 de novembro de 2026', 'Last updated: November 16, 2026', 'Última actualización: 16 de noviembre de 2026'];

// blocos: h = título, p = parágrafo, ul = lista
export const blocks = [
  ['p', [
    'Esta política explica como a NanoBrasil trata os dados pessoais de quem visita este site e de quem entra em contato conosco, em linha com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).',
    'This policy explains how NanoBrasil handles the personal data of people who visit this website and of those who contact us, in line with the Brazilian General Data Protection Law (Law No. 13,709/2018, the LGPD).',
    'Esta política explica cómo NanoBrasil trata los datos personales de quienes visitan este sitio y de quienes se ponen en contacto con nosotros, de acuerdo con la Ley General de Protección de Datos de Brasil (Ley n.º 13.709/2018, la LGPD).']],

  ['h', ['Quem é o responsável pelos dados', 'Who is responsible for the data', 'Quién es el responsable de los datos']],
  ['p', [
    `A NanoBrasil, sediada no ${contact.park}, em ${contact.city}, é a controladora dos dados pessoais tratados por este site. Endereço: ${contact.address}, ${contact.cep}.`,
    `NanoBrasil, based at ${contact.park}, in ${contact.city}, is the controller of the personal data processed through this website. Address: ${contact.address}, ${contact.cep}.`,
    `NanoBrasil, con sede en ${contact.park}, en ${contact.city}, es la controladora de los datos personales tratados a través de este sitio. Dirección: ${contact.address}, ${contact.cep}.`]],

  ['h', ['Quais dados coletamos', 'What data we collect', 'Qué datos recopilamos']],
  ['p', [
    'Coletamos somente o que você nos informa ao preencher o formulário de contato ou ao escrever para nós:',
    'We only collect what you give us when you fill in the contact form or write to us:',
    'Solo recopilamos lo que usted nos informa al completar el formulario de contacto o al escribirnos:']],
  ['ul', [
    ['nome e empresa;', 'name and company;', 'nombre y empresa;'],
    ['e-mail e telefone;', 'email and phone number;', 'correo electrónico y teléfono;'],
    ['a área de interesse (pesquisa, nanopartículas ou consultoria);', 'your area of interest (research, nanoparticles or consulting);', 'el área de interés (investigación, nanopartículas o consultoría);'],
    ['o conteúdo da mensagem, como o desafio da sua indústria ou os produtos que deseja cotar.', 'the content of your message, such as your industry challenge or the products you want a quote for.', 'el contenido del mensaje, como el desafío de su industria o los productos que desea cotizar.']]],
  ['p', [
    'Não pedimos dados sensíveis, documentos pessoais nem informações de pagamento por este site.',
    'We do not ask for sensitive data, personal documents or payment information through this website.',
    'No solicitamos datos sensibles, documentos personales ni información de pago a través de este sitio.']],

  ['h', ['Para que usamos os dados', 'What we use the data for', 'Para qué usamos los datos']],
  ['p', [
    'Ao enviar um formulário solicitando cotação ou contato, a NanoBrasil armazena os seus dados para entrar em contato com você. Usamos essas informações para:',
    'When you submit a form requesting a quote or contact, NanoBrasil stores your data in order to get in touch with you. We use this information to:',
    'Al enviar un formulario solicitando una cotización o contacto, NanoBrasil almacena sus datos para ponerse en contacto con usted. Usamos esta información para:']],
  ['ul', [
    ['responder à sua mensagem e entender a sua demanda;', 'answer your message and understand your needs;', 'responder a su mensaje y entender su demanda;'],
    ['enviar cotações, propostas, amostras e informações técnicas sobre nanopartículas e projetos de pesquisa;', 'send quotes, proposals, samples and technical information about nanoparticles and research projects;', 'enviar cotizaciones, propuestas, muestras e información técnica sobre nanopartículas y proyectos de investigación;'],
    ['manter o histórico do atendimento e da relação comercial;', 'keep a record of our service and business relationship;', 'mantener el historial de atención y de la relación comercial;'],
    ['cumprir obrigações legais e regulatórias, quando houver.', 'comply with legal and regulatory obligations, where applicable.', 'cumplir obligaciones legales y regulatorias, cuando las haya.']]],
  ['p', [
    'Não usamos os seus dados para decisões automatizadas e não os vendemos a terceiros.',
    'We do not use your data for automated decision-making and we do not sell it to third parties.',
    'No usamos sus datos para decisiones automatizadas y no los vendemos a terceros.']],

  ['h', ['Base legal', 'Legal basis', 'Base legal']],
  ['p', [
    'Tratamos os dados com base no seu consentimento, dado ao enviar o formulário, e na necessidade de realizar procedimentos preliminares relacionados a um contrato a pedido seu, como uma cotação. Em alguns casos, também com base no legítimo interesse da NanoBrasil de manter a relação comercial, sempre respeitando os seus direitos.',
    'We process data on the basis of your consent, given when you submit the form, and of the need to carry out preliminary steps related to a contract at your request, such as a quote. In some cases we also rely on NanoBrasil’s legitimate interest in maintaining the business relationship, always respecting your rights.',
    'Tratamos los datos con base en su consentimiento, otorgado al enviar el formulario, y en la necesidad de realizar procedimientos preliminares relacionados con un contrato a petición suya, como una cotización. En algunos casos, también con base en el interés legítimo de NanoBrasil de mantener la relación comercial, siempre respetando sus derechos.']],

  ['h', ['Como enviamos e armazenamos os dados', 'How we send and store data', 'Cómo enviamos y almacenamos los datos']],
  ['p', [
    'O formulário permite escolher o envio por e-mail ou por WhatsApp. Os dados chegam à equipe comercial da NanoBrasil pelo canal escolhido e ficam armazenados em nossos sistemas de e-mail e de atendimento, com acesso restrito às pessoas que precisam deles para responder você.',
    'The form lets you choose to send your request by email or by WhatsApp. The data reaches NanoBrasil’s sales team through the channel you chose and is stored in our email and customer service systems, with access restricted to the people who need it to respond to you.',
    'El formulario permite elegir el envío por correo electrónico o por WhatsApp. Los datos llegan al equipo comercial de NanoBrasil por el canal elegido y quedan almacenados en nuestros sistemas de correo y de atención, con acceso restringido a las personas que los necesitan para responderle.']],
  ['p', [
    'Guardamos os dados pelo tempo necessário para atender a sua solicitação e manter a relação comercial. Depois disso, eles são excluídos ou anonimizados, salvo quando a lei exigir que sejam mantidos por mais tempo.',
    'We keep the data for as long as needed to handle your request and maintain the business relationship. After that, it is deleted or anonymized, unless the law requires it to be kept for longer.',
    'Conservamos los datos durante el tiempo necesario para atender su solicitud y mantener la relación comercial. Después, se eliminan o se anonimizan, salvo que la ley exija conservarlos por más tiempo.']],

  ['h', ['Compartilhamento', 'Sharing', 'Compartición']],
  ['p', [
    'Não vendemos nem alugamos dados pessoais. Podemos compartilhá-los apenas com fornecedores que viabilizam o nosso atendimento, como serviços de hospedagem, e-mail e mensagens, e com autoridades quando houver obrigação legal. Esses fornecedores só podem usar os dados para prestar o serviço contratado.',
    'We do not sell or rent personal data. We may share it only with providers that make our service possible, such as hosting, email and messaging services, and with authorities where legally required. These providers may only use the data to deliver the contracted service.',
    'No vendemos ni alquilamos datos personales. Podemos compartirlos solo con proveedores que hacen posible nuestra atención, como servicios de alojamiento, correo y mensajería, y con autoridades cuando exista una obligación legal. Estos proveedores solo pueden usar los datos para prestar el servicio contratado.']],

  ['h', ['Seus direitos', 'Your rights', 'Sus derechos']],
  ['p', [
    'Você pode solicitar a exclusão dos seus dados a qualquer momento. Basta escrever para o e-mail indicado no fim desta página. Além disso, a LGPD garante a você o direito de:',
    'You can request the deletion of your data at any time. Just write to the email address given at the end of this page. In addition, the LGPD gives you the right to:',
    'Usted puede solicitar la eliminación de sus datos en cualquier momento. Basta escribir al correo indicado al final de esta página. Además, la LGPD le garantiza el derecho de:']],
  ['ul', [
    ['confirmar que tratamos dados seus e acessá-los;', 'confirm that we process your data and access it;', 'confirmar que tratamos datos suyos y acceder a ellos;'],
    ['corrigir dados incompletos, inexatos ou desatualizados;', 'correct incomplete, inaccurate or outdated data;', 'corregir datos incompletos, inexactos o desactualizados;'],
    ['pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados fora da lei;', 'request anonymization, blocking or deletion of unnecessary data or data processed unlawfully;', 'pedir la anonimización, el bloqueo o la eliminación de datos innecesarios o tratados fuera de la ley;'],
    ['receber os seus dados em formato estruturado (portabilidade);', 'receive your data in a structured format (portability);', 'recibir sus datos en un formato estructurado (portabilidad);'],
    ['saber com quem compartilhamos os seus dados;', 'know with whom we share your data;', 'saber con quién compartimos sus datos;'],
    ['revogar o consentimento a qualquer momento, sem prejuízo do tratamento já realizado.', 'withdraw your consent at any time, without affecting processing already carried out.', 'revocar el consentimiento en cualquier momento, sin perjuicio del tratamiento ya realizado.']]],
  ['p', [
    'Respondemos às solicitações em até 15 dias. Se preferir, você também pode registrar uma reclamação na Autoridade Nacional de Proteção de Dados (ANPD).',
    'We respond to requests within 15 days. If you prefer, you can also file a complaint with the Brazilian National Data Protection Authority (ANPD).',
    'Respondemos a las solicitudes en un plazo de hasta 15 días. Si lo prefiere, también puede presentar una queja ante la Autoridad Nacional de Protección de Datos de Brasil (ANPD).']],

  ['h', ['Segurança', 'Security', 'Seguridad']],
  ['p', [
    'Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda e uso indevido. Nenhum sistema é totalmente imune a falhas, e por isso, se houver um incidente que possa afetar você, avisaremos você e a ANPD conforme a lei.',
    'We adopt technical and organizational measures to protect data against unauthorized access, loss and misuse. No system is completely free from failure, so if an incident that could affect you occurs, we will notify you and the ANPD as required by law.',
    'Adoptamos medidas técnicas y organizativas para proteger los datos contra el acceso no autorizado, la pérdida y el uso indebido. Ningún sistema es totalmente inmune a fallos, por lo que, si ocurre un incidente que pueda afectarle, le avisaremos a usted y a la ANPD conforme a la ley.']],

  ['h', ['Cookies e armazenamento no navegador', 'Cookies and browser storage', 'Cookies y almacenamiento en el navegador']],
  ['p', [
    'Este site não usa cookies de publicidade. Usamos apenas o armazenamento necessário para funcionar: a sua preferência de idioma, para abrir o site na língua que você escolheu, e a sua escolha no aviso de cookies. Cookies de medição, se vierem a ser usados, só serão ativados com a sua permissão. Você pode apagar essas informações a qualquer momento nas configurações do navegador.',
    'This website does not use advertising cookies. We only use the storage needed for it to work: your language preference, so the site opens in the language you chose, and your choice in the cookie notice. Measurement cookies, if they come to be used, will only be activated with your permission. You can delete this information at any time in your browser settings.',
    'Este sitio no usa cookies de publicidad. Solo usamos el almacenamiento necesario para su funcionamiento: su preferencia de idioma, para abrir el sitio en la lengua que usted eligió, y su elección en el aviso de cookies. Las cookies de medición, si llegan a usarse, solo se activarán con su permiso. Puede borrar esta información en cualquier momento en la configuración del navegador.']],

  ['h', ['Links para outros sites', 'Links to other websites', 'Enlaces a otros sitios']],
  ['p', [
    'O site contém links para serviços de terceiros, como WhatsApp, LinkedIn, YouTube e Instagram. Esses serviços têm políticas de privacidade próprias, e a NanoBrasil não é responsável pelo tratamento de dados feito por eles.',
    'The website contains links to third-party services, such as WhatsApp, LinkedIn, YouTube and Instagram. These services have their own privacy policies, and NanoBrasil is not responsible for the data processing they carry out.',
    'El sitio contiene enlaces a servicios de terceros, como WhatsApp, LinkedIn, YouTube e Instagram. Estos servicios tienen políticas de privacidad propias, y NanoBrasil no es responsable del tratamiento de datos que realizan.']],

  ['h', ['Alterações nesta política', 'Changes to this policy', 'Cambios en esta política']],
  ['p', [
    'Podemos atualizar esta política para refletir mudanças na lei ou no nosso trabalho. A data da última atualização aparece no topo da página.',
    'We may update this policy to reflect changes in the law or in our work. The date of the last update appears at the top of the page.',
    'Podemos actualizar esta política para reflejar cambios en la ley o en nuestro trabajo. La fecha de la última actualización aparece en la parte superior de la página.']],

  ['h', ['Fale com a gente', 'Contact us', 'Contáctenos']],
  ['p', [
    `Para exercer seus direitos, pedir a exclusão dos seus dados ou tirar dúvidas sobre esta política, escreva para ${mail}.`,
    `To exercise your rights, request deletion of your data or ask questions about this policy, write to ${mail}.`,
    `Para ejercer sus derechos, solicitar la eliminación de sus datos o resolver dudas sobre esta política, escriba a ${mail}.`]],
];

export const privacyBody = () => blocks.map(([t, v]) => {
  if (t === 'h') return `<h2>${v[0]}</h2>`;
  if (t === 'p') return `<p>${v[0]}</p>`;
  return `<ul>${v.map(li => `<li>${li[0]}</li>`).join('')}</ul>`;
}).join('\n');

// triplas [pt, en, es] para o dicionário
export const privacyTr = [
  ['Política de privacidade', 'Privacy policy', 'Política de privacidad'],
  ['Como a NanoBrasil trata os dados pessoais que você compartilha conosco.', 'How NanoBrasil handles the personal data you share with us.', 'Cómo NanoBrasil trata los datos personales que usted comparte con nosotros.'],
  UPDATED,
  ...blocks.flatMap(([t, v]) => t === 'ul' ? v : [v]),
];
