
# Sistema Escolar Mobile

Este projeto é um aplicativo mobile desenvolvido com React Native, destinado a facilitar o acesso de alunos a informações acadêmicas, comunicados e contatos da escola.

## Funcionalidades

- **Tela de Turmas**: Visualização das turmas e disciplinas em que o aluno está matriculado, com informações como horários e professores responsáveis.
- **Tela de Conceitos**: Acompanhamento do desempenho acadêmico do aluno em cada disciplina.
- **Tela de Comunicados**: Recebimento de comunicados da escola, com a possibilidade de visualizar detalhes ao clicar em cada item.
- **Tela de Contatos**: Acesso rápido aos contatos da escola, com links para telefone e WhatsApp.
- **Tela Financeira**: Direcionamento para o sistema financeiro da escola.

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- React Native Vector Icons

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd sistema-escolar-mobile
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npx expo start
   ```

## Estrutura do Projeto

```
sistema-escolar-mobile
├── App.js                  # Arquivo principal da aplicação
├── package.json            # Dependências do projeto
├── screens                 # Diretório contendo as telas do aplicativo
│   ├── TurmasScreen.js     # Tela de Turmas
│   ├── ConceitosScreen.js  # Tela de Conceitos
│   ├── ComunicacoesScreen.js # Tela de Comunicados
│   ├── ContatosScreen.js    # Tela de Contatos
│   └── FinanceiroScreen.js  # Tela Financeira
└── assets                  # Diretório para armazenar imagens e outros assets
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License.
