document.getElementById('chuveiro-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const potencia = parseFloat(document.getElementById('potencia').value);
  const tensao = parseFloat(document.getElementById('tensao').value);

  // Corrente elétrica (I = P / V)
  const corrente = potencia / tensao;

  // Dimensionamento simples baseado em NBR 5410 (valores típicos)
  let cabo = '';
  if (corrente <= 25) cabo = '4 mm² cobre';
  else if (corrente <= 32) cabo = '6 mm² cobre';
  else cabo = 'Consultar tabela NBR 5410';

  let disjuntor = '';
  if (corrente <= 25) disjuntor = '25 A curva C';
  else if (corrente <= 32) disjuntor = '32 A curva C';
  else disjuntor = 'Consultar proteção adequada';

  // Resultado mostrado
  document.getElementById('resultado').innerHTML = `
    <h3>Resultados</h3>
    <p><strong>Corrente calculada:</strong> ${corrente.toFixed(2)} A</p>
    <p><strong>Cabo recomendado:</strong> ${cabo}</p>
    <p><strong>Disjuntor recomendado:</strong> ${disjuntor}</p>
    <p><strong>DR 30mA é obrigatório para proteção do chuveiro.</strong></p>
  `;

  // Gerar diagrama SVG
  document.getElementById('diagrama-chuveiro').innerHTML = `
    <svg width="300" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect x="120" y="40" width="60" height="40" fill="#ccc" stroke="#000" />
      <text x="130" y="60" font-family="Arial" font-size="12">Chuveiro</text>

      <line x1="150" y1="80" x2="150" y2="110" stroke="orange" stroke-width="4"/>
      <text x="160" y="100" font-family="Arial" font-size="12">Fase</text>

      <line x1="180" y1="80" x2="180" y2="110" stroke="blue" stroke-width="4"/>
      <text x="190" y="100" font-family="Arial" font-size="12">Neutro</text>

      <line x1="160" y1="110" x2="160" y2="140" stroke="green" stroke-width="4"/>
      <text x="170" y="130" font-family="Arial" font-size="12">Terra (PE)</text>
    </svg>
  `;
});
