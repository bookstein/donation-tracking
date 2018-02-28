// Create-React-App is set up to automatically execute this file
// https://github.com/facebook/create-react-app/blob/next/packages/react-scripts/template/README.md#initializing-test-environment

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
