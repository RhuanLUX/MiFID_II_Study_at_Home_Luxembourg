# EIP Luxembourg, pacote de desenvolvimento para Codex

## OBJETIVO
Reconstruir, com profundidade pedagógica, a plataforma de estudo diário para a certificação European Investment Practitioner (EIP) da EFPA Luxembourg. Cada sessão deve oferecer aprendizagem autossuficiente de aproximadamente 30 minutos, não apenas um resumo. O número total de dias será definido pelo currículo, mesmo que ultrapasse 250 dias.

## COMO USAR
1. Extraia o ZIP inteiro numa pasta de trabalho nova, idealmente sob controle Git.
2. Abra a pasta extraída no ambiente de desenvolvimento do Codex.
3. Copie integralmente `MASTER_PROMPT_CODEX.txt` e envie como primeira mensagem ao Codex.
4. Permita ao Codex consultar os links institucionais contidos em `02_RASTREABILIDADE/FONTES_OFICIAIS.md` e atualizar as fontes quando necessário.
5. Acompanhe os relatórios de progresso e avalie as três aulas piloto por sua substância, sem aprovar volume artificial de aulas.

## CONTEUDO DO PACOTE
- `MASTER_PROMPT_CODEX.txt`: instrução principal, suficientemente completa para executar o projeto.
- `00_BASELINE/EIP_Luxembourg_Plano_Estudos_148_Dias.html`: HTML atual, APENAS referência visual e funcional, com conteúdo reprovado na auditoria.
- `01_DIRETRIZES/ESPECIFICACAO_PEDAGOGICA.md`: estrutura e critérios da aula de 30 minutos.
- `01_DIRETRIZES/ARQUITETURA_PRODUTO.md`: interface, persistência, funcionamento offline, teste e acessibilidade.
- `02_RASTREABILIDADE/FONTES_OFICIAIS.md`: links oficiais e divergências que exigem tratamento explícito.
- `02_RASTREABILIDADE/MATRIZ_SYLLABUS_EIP_LUX.csv`: objetivos mapeados ao syllabus. Os objetivos granulares são decomposições pedagógicas autorais, NÃO transcrições oficiais completas.
- `03_MODELOS/SCHEMA_AULA_EXEMPLO.json`: estrutura de dados ilustrativa, não currículo final.
- `03_MODELOS/GOLDEN_MASTER_CRITERIOS.md`: requisitos para aprovação das três primeiras aulas.
- `04_QUALIDADE/QUALITY_GATES.md`: validações obrigatórias, evidências e critérios de aceite.
- `04_QUALIDADE/AUDITORIA_DO_BASELINE.md`: problemas existentes que não devem ser replicados.
- `04_QUALIDADE/PLANO_DE_ENTREGAS.md`: ordem de execução e status reports.

## REGRAS DE ESCOPO
- EXAME: EIP da EFPA LUXEMBOURG, não EIP espanhol, não exame AMF francês, não certificação House of Training.
- FONTES: syllabus EIP Luxembourg e regulamento de exame EFPA Luxembourg prevalecem sobre materiais de terceiros.
- IDIOMA: inglês como conteúdo principal e português brasileiro completo, revelado pelo ícone de olho.
- FUNCIONAMENTO: HTML final único, offline, que abre diretamente num navegador moderno. Projeto fonte pode ser modular.
- SIMULADO: complementar, não substituir o estudo por aulas.
- DIREITO AUTORAL: criar textos, exemplos e questões originais. Usar links para materiais de terceiros, sem reproduzir apostilas pagas ou questões confidenciais.

## ALERTA REGULATORIO
O regulamento EIP Luxembourg publicado apresenta divergência interna: 30 questões Knowledge com +1, 15 Analysis com +2 e 5 Application com +6 somam 90 pontos máximos, mas o documento cita aprovação de 47/77 ou 60% de acertos. NÃO resolver esta discrepância por suposição. Reproduzir pesos declarados, registrar a inconsistência e consultar a EFPA para o critério efetivo de aprovação. Enquanto não houver esclarecimento, não declarar aprovação oficial a partir de um simulado.
