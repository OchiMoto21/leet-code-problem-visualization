export function FinalAnswer({value, stepMatrices}) {
  console.log(stepMatrices)
  const answer_style = {borderBottom: "var(--border-color) 1px solid", margin: 0, padding: "0.5rem", minHeight: "2.25rem"};
  return (
    <div id="step-4">
      <div className='step-title'>
        <h2>Final Answer</h2>

        <a href={"#step-3"} className='prev-button'>

          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9783 5.31877L10.7683 8.52877L8.79828 10.4888C7.96828 11.3188 7.96828 12.6688 8.79828 13.4988L13.9783 18.6788C14.6583 19.3588 15.8183 18.8688 15.8183 17.9188V12.3088V6.07877C15.8183 5.11877 14.6583 4.63877 13.9783 5.31877Z" fill="#D4D4D4" />
          </svg>
        </a>

        <a href={"#"} className='next-button'>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.1997 10.4919L13.2297 8.52188L10.0197 5.31188C9.33969 4.64188 8.17969 5.12188 8.17969 6.08188V12.3119V17.9219C8.17969 18.8819 9.33969 19.3619 10.0197 18.6819L15.1997 13.5019C16.0297 12.6819 16.0297 11.3219 15.1997 10.4919Z" fill="#D4D4D4" />
          </svg>
        </a>

      </div>
      <div className="step-answer">

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
                {
                  value.slice(stepMatrices["finalAnswer"][0], stepMatrices["finalAnswer"][1] + 1).split("").map((char, charIndex) => {
                    return (
                      <td key={char + charIndex}>
                        <h4 style={answer_style}>{char}</h4>

                        <h4 style={answer_style}>{stepMatrices["finalAnswer"][0] + charIndex}</h4>
                      </td>
                    )
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

