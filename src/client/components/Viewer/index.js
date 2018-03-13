////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2016 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
///////////////////////////////////////////////////////////
import React from 'react'
import './viewer.scss'

class Viewer extends React.Component {

  /////////////////////////////////////////////////////////
  // Component has been mounted so this container div is now created
  // in the DOM and viewer can be instantiated
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    this.viewer = new window.Autodesk.Viewing.Private.GuiViewer3D(
      this.viewerContainer)

    if (this.props.onViewerCreated) {

      this.props.onViewerCreated(this.viewer)
    }
  }

  /////////////////////////////////////////////////////////
  // Component will unmount so we can destroy 
  // the viewer to avoid memory leaks
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount () {

    if (this.viewer) {

      if (this.viewer.impl.selector) {

        this.viewer.tearDown()
        this.viewer.finish()
        this.viewer = null
      }
    }
  }

  /////////////////////////////////////////////////////////
  // Render component, resize the viewer if exists
  //
  /////////////////////////////////////////////////////////
  render() {

    return (
      <div ref={(div) => this.viewerContainer = div}
        className="viewer-container"
      />
    )
  }
}

export default Viewer
