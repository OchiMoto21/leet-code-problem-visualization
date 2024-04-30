import {Component} from 'react';
import DPTable from './DisplayMatrix';
import './DynamicProgramming.css'

function clone(arr) {
  return JSON.parse(JSON.stringify(arr))
}

class DynamicProgramming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      stepMatrices: {
        "Step 1": {},
        "Step 2": {},
        "Step 3": {}
      },
      // stepMatrices data structure
      // stepMatrices: {
      //     'Step 1': {
      //         "-1 -1": {
      //             "Matrices": {},
      //             "Explanation": {},
      //             "Answer": {}
      //         }
      //     },
      //     "Final Answer": {
      //         "Answer": {}
      //     },
      // },
      showWarning: false

    };



    this.handleChange = this.handleChange.bind(this)
    this.renderDPElements = this.renderDPElements.bind(this)

  }

  handleChange(event) {
    let {value} = event.target;

    if (value.length > 12) {
      value = value.slice(0, 12);
      this.setState({showWarning: true});
    } else {
      this.setState({showWarning: false});
    }

    this.setState({value});
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('inputValue', this.state.value);
    if (prevState.value !== this.state.value) {
      this.generateDPElements();
    }
  }
  componentDidMount() {
    const savedValue = localStorage.getItem('inputValue');
    if (savedValue) {
      this.setState({value: savedValue});
    }
  }

  renderDPElements() {
    const {value, stepMatrices} = this.state;
    const answer_style = {borderBottom: "var(--border-color) 1px solid", margin: 0, padding: "0.5rem", minHeight: "2.25rem"};

    return Object.entries(stepMatrices).map(([step, matricesObject], index) => {
      if (Object.keys(matricesObject).length === 0) return "";

      return (
        <div key={step + "[" + index + "]"}>
          <div className='step-title'>
            <h2>{step}</h2>
          </div>
          {Object.entries(matricesObject).map(([matrixKey, matrix], matricesIndex) => (
            <div key={matrixKey} className={("Final Answer" === step ? "" : 'step-container')} >
              {
                matrix.hasOwnProperty("Matrices") &&
                <div className='step-matrix'>
                  <div className='header'>
                    <h3>Dynamic Programming Matrix</h3>
                  </div>
                  <DPTable dp={matrix["Matrices"]} string={value} cellChanged={matrixKey.split(" ").map(char => parseInt(char, 10))} />
                </div>
              }
              {
                matrix.hasOwnProperty("Explanation") &&
                <div className='step-explanation'>
                  <div className='header'>
                    <h3>Explanation</h3>
                  </div>
                  <div className='text-block'>
                    {matrix["Explanation"]}
                  </div>
                </div>
              }

              < div className='step-answer' >
                <div className='header'>
                  <h3>Current Answer</h3>
                </div>
                <div className='table-wrapper' style={{minHeight: "8rem"}}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h4 style={answer_style}><code>char</code></h4>

                          <h4 style={answer_style}><code>index</code></h4>
                        </td>
                        {value.slice(matrix["Answer"][0], matrix["Answer"][1] + 1).split("").map((char, charIndex) => {

                          return (
                            <td key={char + charIndex}>
                              <h4 style={answer_style}>{char}</h4>

                              <h4 style={answer_style}>{matrix["Answer"][0] + charIndex}</h4>
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div >
          ))
          }
        </div>)

    })
  }

  generateDPElements() {
    const {value} = this.state;
    const n = value.length;
    let ans = [0, 0]

    const arr = Array.from({length: n}, () => Array(n).fill(false));
    const stepMatrices = {
      "Step 0": {},
      "Step 1": {},
      "Step 2": {},
      "Step 3": {},
      "Final Answer": {}
    };


    stepMatrices["Step 0"]["-1 -1"] = {
      "Matrices": clone(arr),
      "Explanation":
        <div>

          <p>
            Initialization of dynamic programming matrix.&#160;
            <code>matrix[i][j]</code> represents whether the substring from <code>i</code> to <code>j</code> is a palindrome or not,
            with all elements initially set to <code>false</code>.
          </p>
          <p style={{marginBottom: "0rem"}}>
            Matrix value color assignment
          </p>
          <div className='table-wrapper' style={{justifyContent: "left"}}>
            <table>
              <tbody>
                <tr>
                  <td className='value-true'>1</td>
                  <td style={{textAlign: "left"}}>&#160; true</td>
                </tr>
                <tr>
                  <td className='value-false'>0</td>
                  <td style={{textAlign: "left"}}>&#160; false</td>
                </tr>
                <tr>
                  <td className='value-changed'>?</td>
                  <td style={{textAlign: "left"}}>&#160; value changed</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>,
      "Answer": [ans[0], ans[1]]
    };




    for (let i = 0; i < n; i++) {
      arr[i][i] = true;
    }
    stepMatrices["Step 1"]["-1 -1"] = {
      "Matrices": clone(arr),
      "Explanation":
        <p>
          Since substrings with a length of 1 will always be palindromes, we further initialize the matrix by setting the diagonal, which corresponds to each individual character on the row and column, to <code>true</code>.
        </p>,
      "Answer": [ans[0], ans[1]]
    };



    for (let i = 0; i < n - 1; i++) {
      if (value.charAt(i) === value.charAt(i + 1)) {
        arr[i][i + 1] = true;
        ans[0] = i;
        ans[1] = i + 1;
      }
      stepMatrices["Step 2"][i.toString() + " " + (i + 1).toString()] = {
        "Matrices": clone(arr),
        "Explanation":
          <p>
            Substrings with length of 2 is a palindrome if <code>string&#091;i&#093; == string&#091;i+1&#093;</code>. With this value, we can check whether substring with length of 4, 6 and so on is a palindrome or not. In this part,&#160;
            {arr[i][i + 1] &&
              <span>
                character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is equal to character at <code>{i + 1}</code> &#40;{value.charAt(i + 1)}&#41;. Therefore, we set <code>matrix&#091;{i}&#093;&#091;{i + 1}&#093;</code> equal to <code>true</code>.
              </span>
            }

            {!arr[i][i + 1] &&
              <span>
                character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is not equal to character at <code>{i + 1}</code> &#40;{value.charAt(i + 1)}&#41;. Therefore, we set <code>matrix&#091;{i}&#093;&#091;{i + 1}&#093;</code> equal to <code>false</code>.
              </span>
            }
          </p>,
        "Answer": [ans[0], ans[1]]
      };
    }

    for (let diff = 2; diff < n; diff++) {
      for (let i = 0; i < n - diff; i++) {
        let j = i + diff;
        if (value.charAt(i) === value.charAt(j) && arr[i + 1][j - 1]) {
          arr[i][j] = true;
          ans[0] = i;
          ans[1] = j;
        }
        stepMatrices["Step 3"][i.toString() + " " + j.toString()] = {
          "Matrices": clone(arr),
          "Explanation": (
            <div>

              {(i === 0 && diff === 2) &&
                <p>
                  So, if a substring, for example, 'aa', is a palindrome, then adding the same character yields '[char]aa[char]', which remains a palindrome. By leveraging the results from the two previous steps for odd and even length palindromes, we can ascertain whether the outer boundary of each substring is also a palindrome. This allows us to determine the overall condition of the substring along with its boundary.
                </p>
              }

              <p> In this part,&#160;{
                arr[i][j] ? (
                  <span>
                    the character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is equal to the character at <code>{j}</code> &#40;{value.charAt(j)}&#41; and we can see from previous calculation (<code>matrix[{i + 1}][{j - 1}]</code>) that substring from <code>{i + 1}</code> ({value.charAt(i + 1)}) to <code>{j - 1}</code> ({value.charAt(j - 1)}) is a palindrome.
                    Therefore, we set <code>matrix&#091;{i}&#093;&#091;{j}&#093;</code> equal to <code>true</code>.
                  </span>
                ) : (
                  value.charAt(i) === value.charAt(j) ? (
                    <span>
                      the character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is equal to the character at <code>{j}</code> &#40;{value.charAt(j)}&#41; But, we can see from previous calculation (<code>matrix[{i + 1}][{j - 1}]</code>) that substring from <code>{i + 1}</code> ({value.charAt(i + 1)}) to <code>{j - 1}</code> ({value.charAt(j - 1)}) is not a palindrome, invalidating palindrome properties.
                      Therefore, we set <code>matrix&#091;{i}&#093;&#091;{j}&#093;</code> equal to <code>false</code>.
                    </span>
                  ) : (
                    arr[i + 1][j - 1] ? (
                      <span>
                        the character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is not equal to the character at <code>{j}</code> &#40;{value.charAt(j)}&#41; and we can see from previous calculation (<code>matrix[{i + 1}][{j - 1}]</code>) that substring <code>{i + 1}</code> ({value.charAt(i + 1)}) to <code>{j - 1}</code> ({value.charAt(j - 1)}) is a palindrome.
                        Although the inside of this substring is a palindrome, the boundary is not palindrome. Therefore, we set <code>matrix&#091;{i}&#093;&#091;{j}&#093;</code> equal to <code>false</code>.
                      </span>
                    ) : (
                      <span>
                        the character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is not equal to the character at <code>{j}</code> &#40;{value.charAt(j)}&#41; and we can see from previous calculation (<code>matrix[{i + 1}][{j - 1}]</code>) that substring <code>{i + 1}</code> ({value.charAt(i + 1)}) to <code>{j - 1}</code> ({value.charAt(j - 1)}) is not a palindrome.
                        Therefore, we set <code>matrix&#091;{i}&#093;&#091;{j}&#093;</code> equal to <code>false</code>.
                      </span>
                    )
                  )
                )
              }
              </p>
            </div>

          ),
          "Answer": [ans[0], ans[1]]
        };

      }
    }
    stepMatrices["Final Answer"] = {
      "-1 -1": {
        "Answer": [ans[0], ans[1]]
      }
    };
    console.log("stepMatrices is rendered");
    this.setState({stepMatrices});
  }


  render() {
    const {value, showWarning} = this.state;
    return (
      <main>
        <h2>Dynamic Programming Approach</h2>

        <form style={{marginBottom: "1rem", position: "relative"}}>
          <label>
            <code style={{padding: "1rem"}}>string</code>&#160;
          </label>
          <input type="text" value={value} onChange={this.handleChange} onSubmit={this.handleChange} placeholder="Enter string to test..." />
          {showWarning && <p style={{color: "rgb(255, 73, 73)", textAlign: 'center'}}>I limit the string length to be 12 as I still struggle to render tables help :D</p>}
        </form>
        {value.length === 0 ? (
          <div style={{paddingTop: "1rem", paddingBottom: "1rem", marginTop: "1rem", marginBottom: "1rem"}}>
            <div className='step-matrix' style={{height: "50dvh", display: "flex", justifyContent: "center", alignItems: "center", color: "#9b9b9b"}}>
              <p>
                Visualization will be shown here
              </p>

            </div>
          </div>
        ) : (
          <div className='matrix-wrapper'>
            {this.renderDPElements()}
          </div>
        )}

      </main>
    )
  }

}

export default DynamicProgramming;
