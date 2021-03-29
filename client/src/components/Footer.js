import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
      <div className="bg-blue-100 p-5">
          <div className="m-2 text-center">
            <span className="p-2">
              <FontAwesomeIcon icon={faCopyright} size="lg"/>
            </span>
            <p className="inline text-xl font-mono">2021 E-Market</p>
          </div>
          <div className="m-2 text-center">
            <a href="https://github.com/mikejoh12/e-commerce">
              <span className="p-2">
                  <FontAwesomeIcon icon={faGithub} size="lg"/>
              </span>
              <p className="inline text-xl font-mono">Git Repo</p>
            </a>
          </div>
      </div>
    )
  }
  
  export default Footer