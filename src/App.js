import React, { Component } from "react";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #7159c1;
`;

const ScreenQuiz = styled.div`
  display: flex;
  justify-content: ${props => (props.screen ? 'space-between' : 'center' )};
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  padding: ${props => (props.screen ? '5rem' : '.5rem')};
  width: 100%;
  height: 60vh;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 100px -20px #000;
  transform: perspective(1px) translateZ(0);

  &:hover {
    animation-name: animation-float, animation;
    animation-duration: .3s, 1.5s;
    animation-delay: 0s, .3s;
    animation-timing-function: ease-out, ease-in-out;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards;
    animation-direction: normal, alternate;
  }

  @keyframes animation {
    0% {
      transform: translateY(-8px);
    }
    50% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(-8px);
    }
  }

  @keyframes animation-float {
    100% {
      transform: translateY(-8px);
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #7159c1;
  margin-bottom: .5rem;
  text-align: center;
  max-width: 90%;
`;

const Paragraph = styled.p`
  font-size: 1.5rem;
`;

const Button = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  width: 40%;
  height: 3rem;
  color: #fff;
  border: none;
  cursor: pointer;
  background: #7159c1;
  border-radius: 5px;
  box-shadow: 0px 3px 15px 0px #666;
`;

const ContainerLabel = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto .5rem auto;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Radio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  border: .5px solid black;
  margin: 0 .5rem 0 0;
  background: ${props => (props.clickedLabel ? '#7159c1' : '#fff')};
`;

const IntoRadio = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background: #fff;
`;

const Error = styled.div`
  top: 22rem;
  color: red;
  position: absolute;
  font-weight: bold;
`;

export default class App extends Component {
  state = {
    questions: [
      {
        question: "What is the capital of Canada?",
        alternatives: [
          {
            label: "São Paulo",
            currectAnswer: false,
          },
          {
            label: "Madrid",
            currectAnswer: false,
          },
          {
            label: "Ottawa",
            currectAnswer: true,
          },
          {
            label: "Cairo",
            currectAnswer: false,
          },
        ],
      },
      {
        question: "What is the capital of Sweeden?",
        alternatives: [
          {
            label: "Tokyio",
            currectAnswer: false,
          },
          {
            label: "Estocolmo",
            currectAnswer: true,
          },
          {
            label: "Moscow",
            currectAnswer: false,
          },
          {
            label: "Havana",
            currectAnswer: false,
          },
        ],
      },
      {
        question: "What is the capital of Germany?",
        alternatives: [
          {
            label: "Berlim",
            currectAnswer: true,
          },
          {
            label: "Paris",
            currectAnswer: false,
          },
          {
            label: "Lyon",
            currectAnswer: false,
          },
          {
            label: "Montevidéu",
            currectAnswer: false,
          },
        ],
      },
      {
        question: "What is the capital of Argentina?",
        alternatives: [
          {
            label: "Munique",
            currectAnswer: false,
          },
          {
            label: "Kiev",
            currectAnswer: false,
          },
          {
            label: "New York",
            currectAnswer: false,
          },
          {
            label: "Bueno Aires",
            currectAnswer: true,
          },
        ],
      },
      {
        question: "What is the capital of Norway?",
        alternatives: [
          {
            label: "Beijing",
            currectAnswer: true,
          },
          {
            label: "Oslo",
            currectAnswer: false,
          },
          {
            label: "Sidney",
            currectAnswer: false,
          },
          {
            label: "Seattle",
            currectAnswer: false,
          },
        ],
      }
    ],
    screen: true,
    count: 0,
    clickedLabel: {},
    answer: 0,
    error: false,
    screenFinish: false,
    timer: null
  };

  renderInitial = () => {
    const { second, count } = this.state;

    this.setState({ 
      screen: false,
      count: 1,
      timer: 3
    })
  }

  handleClick = () => {
    const { count, questions, clickedLabel, answer, second } = this.state;

    if(questions.length >= count && clickedLabel.label) {
      this.setState({
        count: count + 1,
        clickedLabel: {},
        answer: clickedLabel.currectAnswer ? answer + 1 : answer,
        error: false,
        timer: 3
      });
    } else {
      this.setState({
        count: count,
        error: true,
      });
    }
    
    if(this.state.count >= 5) {
      this.setState({
        screenFinish: true,
        clickedLabel: {}
      });
    }
  }

  renderScreenInitial = () => {
    return (
      <Container>
        <ScreenQuiz screen={this.state.screen}>
          <Title>Country Quiz</Title>
          <Paragraph>Click to start</Paragraph>
          <Button 
            onClick={this.renderInitial}>
            Begin
          </Button>
        </ScreenQuiz>
      </Container>
    )
  };

  handleOptions = (alternatives) => {
    const { clickedLabel } = this.state;

    return alternatives.map((alternative, index) => {
      return (
        <Label 
          key={index} 
          onClick={() => this.setState({
          clickedLabel: alternative,
          error: false
          })}>
          <Radio 
            clickedLabel={clickedLabel.label === alternative.label}>
            <IntoRadio></IntoRadio>
          </Radio>
          <Paragraph>{alternative.label}</Paragraph>
        </Label>
      )
    })
  }

  renderQuestions = () => {
    const { questions, count, error, timer } = this.state;

    const NewQuestions = Array.from(questions);
    const removeQuestions = NewQuestions.slice(count - 1, count);

    return removeQuestions.map((quest, index) => (
      <Container key={index}>
        <ScreenQuiz>
          <Title>{quest.question}</Title>
          <ContainerLabel>
            {this.handleOptions(quest.alternatives)}
          </ContainerLabel>
          <Button
            onClick={this.handleClick}>
            Submit
          </Button>
          {error && <Error>Please check an alternative.</Error>}
        </ScreenQuiz>
      </Container>
    ));
  };

  renderResult = () => {
    const { answer, screenFinish } = this.state;

    return (
      <Container>
        <ScreenQuiz screen={screenFinish}>
          <Title>you got {answer} out of 5 questions</Title>
          <Button 
            onClick={() => this.setState({ 
            count: 0, 
            screenFinish: false, 
            screen: true, 
            answer: 0,
            timer: 0,
            error: false,
            })}>
            Play again
          </Button>
        </ScreenQuiz>
      </Container>
    );
  };

  render() {
    const { screenFinish, screen } = this.state;

    return (
      !screenFinish 
      ? <>
          {screen 
          ? this.renderScreenInitial() 
          : this.renderQuestions()}
        </> 
      : this.renderResult()
    );
  }
}
