# To-do List PWA LiquidGlass

## Descrição
Aplicação de lista de tarefas (To-do List) com Progressive Web App (PWA), interface moderna em glassmorphism, agendamento de tarefas com alarme sonoro e funcionamento offline.

## Stacks Utilizadas
- **HTML5**: Estrutura da aplicação.
- **CSS3**: Estilo visual, glassmorphism, responsividade e modal customizado.
- **JavaScript**: Lógica de tarefas, IndexedDB, manipulação de DOM, sons e timer.
- **IndexedDB**: Banco de dados local para persistência das tarefas.
- **Service Worker**: Cache de arquivos para funcionamento offline (PWA).

## Funcionalidades
- Adicionar, remover e listar tarefas.
- Capitalização automática da primeira letra da tarefa.
- Sons suaves ao adicionar e remover tarefas.
- Agendamento de tarefas com campo de horário (`input type="time"`).
- Alarme sonoro e popup customizado quando chega o horário agendado.
- Interface responsiva para desktop, Android, iOS e navegadores modernos.
- Funcionamento offline via Service Worker.

## Estrutura de Pastas
```
app.js          # Lógica principal
index.html      # Interface
style.css       # Estilos visuais
sw.js           # Service Worker
README.md       # Documentação
src/
  manifest.json # Manifesto PWA
  sounds/       # Sons (add.wav, remove.mp3, alarm.wav)
  
```

## Como Usar
1. Clone o projeto e abra o `index.html` em seu navegador.
2. Adicione tarefas normalmente.
3. Para agendar um alarme, selecione o horário desejado antes de adicionar a tarefa.
4. O alarme tocará e mostrará um popup no horário agendado.
5. Remova tarefas clicando no botão ❌.

## Requisitos
- Navegador moderno (Chrome, Edge, Firefox, Safari).
- Permissão para reprodução de áudio.

## Observações
- Os arquivos de som devem estar em `src/sounds`.
- O Service Worker garante funcionamento offline após o primeiro acesso.
- O modal de alarme é centralizado e responsivo.

## Autor
Projeto desenvolvido por Rafael de Albquerque Ribeiro.