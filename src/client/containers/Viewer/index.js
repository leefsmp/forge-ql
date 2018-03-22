import Viewer from 'Viewer'
import Loader from 'Loader'
import React from 'react'
import './viewer.css'

const Autodesk = window.Autodesk

class ViewerView extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor(props) {

    super (props)
    
    this.onModelCompletedLoad = this.onModelCompletedLoad.bind(this)
    this.onModelBeginLoad = this.onModelBeginLoad.bind(this)
    this.onViewerCreated = this.onViewerCreated.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)

    this.state = {
      envInitialized: false,
      showLoader: true
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  async componentDidMount () {

    try {

      window.addEventListener('resize', this.onWindowResize)

      await this.initialize({
        useConsolidation: true,
        env: 'AutodeskProduction'
      })

      this.setState(Object.assign({}, this.state, {
        envInitialized: true
      }))

    } catch (ex) {

      if (this.props.onError) {

        return this.props.onError(ex)
      } 
      
      console.log(ex)
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount () {

    window.removeEventListener('resize', this.onWindowResize)
  }

  /////////////////////////////////////////////////////////
  // Initialize viewer environment
  //
  /////////////////////////////////////////////////////////
  initialize (options) {

    return new Promise((resolve, reject) => {

      Autodesk.Viewing.Initializer (options, () => {

        resolve ()

      }, (error) => {

        reject (error)
      })
    })
  }

  /////////////////////////////////////////////////////////
  // Load a document from URN
  //
  /////////////////////////////////////////////////////////
  loadDocument (urn) {

    return new Promise((resolve, reject) => {

      const paramUrn = !urn.startsWith('urn:')
        ? 'urn:' + urn : urn

      Autodesk.Viewing.Document.load(paramUrn, (doc) => {

        resolve (doc)

      }, (error) => {

        reject (error)
      })
    })
  }

  /////////////////////////////////////////////////////////
  // Return viewable path: first 3d or 2d item by default
  //
  /////////////////////////////////////////////////////////
  getViewablePath (doc, pathIdx = 0, query = [
      { type: 'geometry', role: '3d' },
      { type: 'geometry', role: '2d' }
    ]) {

    const toArray = (obj) => {

      return obj ? (Array.isArray(obj) ? obj : [obj]) : []
    }

    const rootItem = doc.getRootItem()

    let items = []

    toArray(query).forEach((queryItem) => {

      items = [ ...items,
        ...Autodesk.Viewing.Document.getSubItemsWithProperties(
          rootItem, queryItem, true) ]
    })

    if (!items.length || pathIdx > items.length-1) {

      return null
    }

    return doc.getViewablePath(items[pathIdx])
  }

  /////////////////////////////////////////////////////////
  // 
  //
  /////////////////////////////////////////////////////////
  async onViewerCreated (viewer) {

    const lmvProxy = 'lmv-proxy-3legged'

    Autodesk.Viewing.endpoint.setEndpointAndApi(
      `${window.location.origin}/${lmvProxy}`,
      'modelDerivativeV2')

    const params = new URLSearchParams(
      this.props.location.search)

    const urn = params.get('urn')

    viewer.setTheme('light-theme')

    viewer.start()

    const doc = await this.loadDocument(urn)

    const path = await this.getViewablePath(doc)

    viewer.loadModel(path, {}, this.onModelBeginLoad)

    this.viewer = viewer
  }

  /////////////////////////////////////////////////////////
  // 
  //
  /////////////////////////////////////////////////////////
  async onModelBeginLoad (model) {

    this.viewer.navigation.toPerspective()

    this.viewer.autocam.setHomeViewFrom(
      this.viewer.navigation.getCamera())

    await this.viewerEvent([
      Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT
    ])
    
    this.onModelCompletedLoad (model)

    this.setState(Object.assign({}, this.state, {
      showLoader: false
    }))
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onModelCompletedLoad (model) {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onWindowResize () {

    if (this.viewer) {

      this.viewer.resize()
    }
  }

  /////////////////////////////////////////////////////////
  // Async viewer event
  //
  /////////////////////////////////////////////////////////
  viewerEvent (eventId, handler) {

    if (handler) {

      this.viewer.addEventListener (eventId, handler)
      return
    }

    const eventIdArray = Array.isArray(eventId)
      ? eventId : [eventId]

    const eventTasks = eventIdArray.map((id) => {
      return new Promise ((resolve) => {
        const __handler = (args) => {
          this.viewer.removeEventListener (id, __handler)
          resolve (args)
        }
        this.viewer.addEventListener (id, __handler)
      })
    })

    return Promise.all (eventTasks)
  }

  /////////////////////////////////////////////////////////
  // 
  //
  /////////////////////////////////////////////////////////
  render () {

    return (
      <div className="viewer">
        <Loader show={this.state.showLoader}/>
        {
          this.state.envInitialized &&
          <Viewer onViewerCreated={this.onViewerCreated}/>
        }
      </div>
    )
  }
}

export default ViewerView