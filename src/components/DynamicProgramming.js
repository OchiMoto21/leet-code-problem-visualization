import {Component} from 'react';
import './DynamicProgramming.css'
import {Steps} from './Steps';
import {FinalAnswer} from './FinalAnswer';


class DynamicProgramming extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      stepMatrices: {
        "step": [],
        "finalAnswer": [],
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

  generateDPElements() {
    const {value} = this.state;
    const n = value.length;
    let ans = [0, 0]

    const arr = Array.from({length: n}, () => Array(n).fill(false));
    const stepMatrices = {
      "step": {
        "0": [],
        "1": [],
        "2": [],
        "3": []
      },
      "finalAnswer": []
    };


    stepMatrices["step"]["0"].push({
      "index": 0,
      "valueUpdated": [-1, -1],
      "matrices": clone(arr),
      "explanation":
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
                  <td className='value-updated'>?</td>
                  <td style={{textAlign: "left"}}>&#160; value changed</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>,
      "answer": [ans[0], ans[1]]
    });




    for (let i = 0; i < n; i++) {
      arr[i][i] = true;
    }

    stepMatrices["step"]["1"].push({
      "index": 0,
      "valueUpdated": [-1, -1],
      "matrices": clone(arr),
      "explanation":
        <p>
          Since substrings with a length of 1 will always be palindromes, we further initialize the matrix by setting the diagonal, which corresponds to each individual character on the row and column, to <code>true</code>.
        </p>,
      "answer": [ans[0], ans[1]]
    });



    for (let i = 0; i < n - 1; i++) {
      if (value.charAt(i) === value.charAt(i + 1)) {
        arr[i][i + 1] = true;
        ans[0] = i;
        ans[1] = i + 1;
      }
      stepMatrices["step"]["2"].push({
        "index": i,
        "valueUpdated": [i, i + 1],
        "matrices": clone(arr),
        "explanation":
          <p>
            Substrings with length of 2 is a palindrome if <code>string&#091;i&#093; == string&#091;i+1&#093;</code>. With this value, we can check whether substring with length of 4, 6 and so on is a palindrome or not. In this part,&#160;
            <span>
              character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is {!arr[i][i + 1] ? "not" : ""} equal to character at <code>{i + 1}</code> &#40;{value.charAt(i + 1)}&#41;. Therefore, we set <code>matrix&#091;{i}&#093;&#091;{i + 1}&#093;</code> equal to {!arr[i][i + 1] ? (<code>false</code>) : (<code>true</code>)}.
            </span>
          </p>,
        "answer": [ans[0], ans[1]]
      });
    }
    let k = 0;
    for (let diff = 2; diff < n; diff++) {
      for (let i = 0; i < n - diff; i++) {
        let j = i + diff;
        if (value.charAt(i) === value.charAt(j) && arr[i + 1][j - 1]) {
          arr[i][j] = true;
          ans[0] = i;
          ans[1] = j;
        }
        stepMatrices["step"]["3"].push({
          "index": k,
          "valueUpdated": [i, j],
          "matrices": clone(arr),
          "explanation": (
            <div>

              {(i === 0 && diff === 2) &&
                <p>
                  So, if a substring, for example, 'aa', is a palindrome, then adding the same character yields '[char]aa[char]', which remains a palindrome. By using the results from the two previous steps for odd and even length palindromes, we can determine whether the outer boundary of each substring is also a palindrome. This allows us to determine the overall condition of the substring along with its boundary.
                </p>
              }

              <p> In this part,&#160;
                <span>
                  the character at <code>{i}</code> &#40;{value.charAt(i)}&#41; is{value.charAt(i) === value.charAt(j) ? " " : " not "}equal to the character at <code>{j}</code> &#40;{value.charAt(j)}&#41; and we can see from previous calculation (<code>matrix[{i + 1}][{j - 1}]</code>) that substring from <code>{i + 1}</code> ({value.charAt(i + 1)}) to <code>{j - 1}</code> ({value.charAt(j - 1)}) is {arr[i + 1][j - 1] ? " " : "not "}a palindrome.
                  {!arr[i][j] && value.charAt(i) !== value.charAt(j) ? " Although the inside of this substring is a palindrome, the boundary is not palindrome. " : " "}Therefore, we set <code>matrix&#091;{i}&#093;&#091;{j}&#093;</code> equal to {arr[i][j] ? <code>true</code> : <code>false</code>}
                </span>
              </p>
            </div>

          ),
          "answer": [ans[0], ans[1]]
        });
        k += 1;
      }
    }
    stepMatrices["finalAnswer"].push(ans[0], ans[1]);

    console.log("stepMatrices is ", stepMatrices);
    this.setState({stepMatrices});
  }

  render() {
    const {value, stepMatrices, showWarning} = this.state;
    return (
      <main>
        <h2>Dynamic Programming Approach</h2>

        <form style={{marginBottom: "1rem", position: "relative"}}>
          <label>
            <code style={{padding: "1rem"}}>string</code>&#160;
          </label>
          <input type="text" value={value} onChange={this.handleChange} onSubmit={this.handleChange} placeholder="Enter string to test..." />
          {showWarning && <p style={{color: "rgb(255, 73, 73)", textAlign: 'center'}}>
            string length limited to 12
          </p>}
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
          <div className='matrix-wrapper' style={{marginBottom: "3rem"}}>
            <Steps value={value} stepMatrices={stepMatrices} />
            <FinalAnswer value={value} stepMatrices={stepMatrices} />
          </div>
        )}

      </main>
    )
  }

}

function clone(arr) {
  return JSON.parse(JSON.stringify(arr))
}

export default DynamicProgramming;
