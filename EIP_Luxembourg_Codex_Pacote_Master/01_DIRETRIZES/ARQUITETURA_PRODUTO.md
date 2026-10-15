# Especificação técnica e funcional

## Baseline visual e melhorias permitidas
Aproveitar organização de menu lateral, títulos discretos, cards, experiência desktop/mobile e botões objetivos. Preservar estética limpa. Não preservar defeitos pedagógicos, inconsistências ou código monolítico como arquitetura interna obrigatória. Possível organização fonte: `src/app`, `src/ui`, `src/storage`, `src/study`, `src/exam`, `content/en`, `content/pt-BR`, `tests`, `scripts` e saída `dist/EIP_Luxembourg_Academy.html`.

## Estado local
- Persistir progresso, respostas, última localização, data dos estudos, histórico de revisão, itens errados/resolvidos e customização de acessibilidade.
- Versionar schema com migrações. Nunca limpar estado automaticamente por incompatibilidade de versão.
- Backup JSON legível com app-id, versão, data, checksums opcionais e validação na importação.
- Restaurar sessão interrompida e evitar duplo registro de respostas.
- Indicar visivelmente quando a gravação local falhou; permitir exportação manual.

## Experiência Study
- 'Continuar dia atual', 'Próximo dia', 'Todos os dias', 'Revisão de hoje', 'Histórico de erros'.
- Perguntas corrigidas imediatamente apenas em Study; depois da escolha, mostrar resposta, justificativa correta e por que alternativas incorretas falham.
- Alterar pergunta é ação previsível; não resetar progresso sem confirmação.
- Botão com ícone de olho, acessível por teclado, revela tradução PT-BR completa e a oculta novamente.
- O aluno pode rever uma aula anterior sem receber artificialmente crédito por completá-la outra vez.

## Experiência Mock EIP
- 50 questões / 120 min / 4 alternativas / única correta; contegens por área: 4,2,22,3,7,4,4,4. K=30, A=15, P=5.
- Construir seleção que preserve margens exatas por módulo e pilar, sem publicar interseções como oficiais.
- Evitar reciclar questões idênticas nos simulados seguidos quando houver banco suficiente.
- Sem dica/correção antes da finalização. Permitir em branco, navegação e visão de pendentes.
- Timeout realiza submissão automaticamente, salva sessão e mostra resultado. Testar aba em background e mudança de relógio do sistema.
- Exibir nota com componentes publicados (+1/-0,33; +2/-0,66; +6/-1,98; omitida 0), mas explicitar ambiguidade do máximo 90 calculado vs '47/77' no PDF e NÃO declarar aprovação oficial sem esclarecimento documentado.
- Relatório detalhado por categoria e pilar com correção de cada opção e sugestão de novas aulas.

## Regras offline
- Nenhuma requisição remota para renderizar, responder, traduzir ou registrar progresso.
- Durante desenvolvimento, web é permitida apenas para pesquisa e validação de fontes.
- Compilar HTML único com CSS/JS/dados embutidos. Não depender de ES modules remotos ou fetch de arquivo local, incompatíveis com `file://` em alguns navegadores.
- Não usar `eval`, `innerHTML` com conteúdo não sanitizado de usuário ou scripts externos.
- Anotações personalizadas devem ser renderizadas com escaping apropriado.

## UX e QA
- Chrome e Edge desktop + layout 390px, touch e teclado; foco visível, sem scroll horizontal e sem controles fora da tela.
- Botões têm labels e estados disabled corretos, indicadores de progresso precisos e texto sem corte.
- Testes automatizados de geração do HTML, dados, estado, simulado, penalidades, cronômetro, persistência, traduções e responsividade.
- Teste real com arquivo `file://`, não só em dev server.
- Preservar a possibilidade de abrir o resultado no Windows e macOS.
