# Espaço Morada Psicologia App

## Sobre o App

Esse é um projeto elaborado visando melhorar o dia a dia de trabalho de uma clinica de psicologia e atendimento clinico, o sistema auxilia o cadastro de pacientes e atendimentos realizados.

- Projeto desenvolvido para atividades da UTFPR - Guarapuava, Curso de Sistemas para internet.

## Objetivos e funcionalidades

Tem como funcionalidades básicas: uma área de cadastro de pacientes; uma área para que sejam registradas as consultas, evoluções e demais anotações pertinentes ao serviço prestado; além de uma área onde seja possivel vizualizar os cadastros e registros, e também pesquisá-los por data ou paciente.
Tem como funcionalidades adicionais ou futuras, a criação de um diário/bloco de notas, para que os pacientes consigam fazer anotações pertinentes ao periodo entre uma sessão e outra.

## Checklist de progressos 

- [ ] Implementação de uma tela inicial
- [ ] Implementação de uma tela de Login
- [ ] Implementação de uma tela principal
- [ ] Implementação de tela de cadastro de clientes
- [ ] Implementação de tela de listagem de clientes
- [ ] Implementação de tela de cadastro de relatórios
- [ ] Implementação de tela de listagem de relatórios
- [ ] Implementação do banco de dados
- [ ] Finalização

## Protótipo de telas

https://www.figma.com/proto/gfjvGPZYZ9FMcw4arFj5hh/Espa%C3%A7o-Morada-Psicologia?node-id=5-45&t=aDyOCdycp6f5bRaq-1

## Modelagem do Banco de Dados

Uso do Firebase ***


## Planejamento de Sprints

- [ ] Configuração Inicial do Projeto:
        Configurar o ambiente e criar a estrutura básica do projeto.

- [ ] Autenticação para Login
      
        Criar a interface da tela de login com campos de entrada (email e senha).
        Configurar autenticação com o Firebase.
        Implementar validações de entrada e mensagens de erro.


- [ ] Interface de Cadastro de Pacientes:
      
        Criar a interface para o formulário de cadastro de pacientes.
        Definir campos principais: nome, idade, endereço, telefone, e email.
        Implementar validações básicas.

- [ ] Função de Edição e Exclusão de Pacientes:
        Adicionar funcionalidades de edição e exclusão para registros de pacientes.
        Implementar um botão "Editar" para atualizar dados de um paciente.
        Implementar botão de exclusão com confirmação.

- [ ] Tela de Listagem de Pacientes:
        Criar a tela para exibir a lista de pacientes cadastrados.
        Criar um botão para que possa acessar a tela de listagem dos relatórios do paciente selecionado.
        Configurar funcionalidade de scroll e busca.
        Exibir campos essenciais: nome, idade, e telefone.

      Total Estimado de Tempo : 14 dias 

      
- [ ] Interface de Cadastro de relatórios:
        Criar a interface para o formulário de cadastro de relatórios.
        Definir a função para salvar o relatório conforme identificação do paciente.
        implementar um botão de salvar, que direcione para o banco de dados.

- [ ] Função de Edição e Exclusão de relatórios:
        Adicionar funcionalidades de edição e exclusão para registros de relatórios.
        Implementar um botão "Editar" para atualizar dados de um relatorio.
        Implementar botão de exclusão com confirmação.

- [ ] Iterface de Listagem de relatórios:
        Criar a tela de apresentação dos relatórios realizados.

    Testes e Validações:
        Realizar testes manuais de fluxo completo (login, cadastro, listagem, edição, exclusão).
      
      Total Estimado de Tempo: 14 dias
      

- [ ] Configuração do Banco de Dados:

        Configurar o banco de dados no Firebase.
        Definir a estrutura das coleções necessárias:
        - Coleção de usuários.
        - Coleção pacientes com os campos: id, nome, idade, endereço, telefone, email.
        - Coleção relatorios com os campos: id, pacienteId, data, descricao.
        
- [ ] Função para Inserir Pacientes no Banco:
        Escrever a lógica para adicionar um novo paciente ao banco de dados.
        Conectar o aplicativo ao banco de dados.
        Exibir mensagem de sucesso ou erro após o cadastro.

- [ ] Revisão total do projeto

  Total Estimado de Tempo : 28 dias


- [ ] Entrega do aplicativo

  





