# Auditoria do arquivo de referência

Arquivo inspecionado: `00_BASELINE/EIP_Luxembourg_Plano_Estudos_148_Dias.html`.

## Evidências obtidas por inspeção direta do JSON embutido
- Lições no array `DATA.lessons`: **111**.
- Dias no array `DATA.days`: **148**.
- Módulos: **8**.
- Média da explicação `core` em inglês: **25.4 palavras**.
- Média do exemplo `example` em inglês: **17.0 palavras**.
- Média da justificativa `why` em inglês: **7.3 palavras**.
- Média da explicação `corept` em português: **10.7 palavras**.
- Cada lição original tem um campo de pergunta `q` e um conjunto `opts`, usado na avaliação e no exame, produzindo sobreposição indevida entre aprendizagem e testes.
- O gerador `generateExam()` seleciona perguntas do próprio `DATA.lessons`, sem um banco independente.
- O bloco do timer atualiza o texto na tela no tempo esgotado, sem evidência de submissão automática no próprio callback.

## Conclusão
O HTML atual é um protótipo de navegação e aparência, não um manual didático. O Codex deve conservar apenas o que estiver funcionando bem na experiência do usuário e reconstruir conteúdo, objetivos, assessment e ferramentas de qualidade.

## Teste de regressão de conteúdo
Na versão nova, bloquear entrega se média de explicações for semelhante à atual e cada lição tiver apenas uma questão. Não usar contagem de palavras como critério único; avaliar profundidade, resultado observável, exemplos, resolução, correção e fontes por competência.
