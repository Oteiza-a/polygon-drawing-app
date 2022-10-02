
import { useEffect, useRef, useState } from 'react';
import ActionButton from './components/action-button/ActionButton';
import { RiEditLine, RiRestartLine } from "react-icons/ri"
import './App.css';
import PolygonImage from './components/polygon-image/PolygonImage';

function App() {
  const canvasWidth = 500;
  const canvasHeight = 450;
  const canvasRef = useRef(null)
  const [canvasCtx, setCanvasCtx] = useState(null)
  const [currentVertex, setCurrentVertex] = useState(null)
  const [polygons, setPolygons] = useState([])
  
  useEffect(() => {
    setCanvasCtx(canvasRef.current.getContext("2d"))
  }, []) //eslint-disable-line

  const createVertex = (e) => {
    const { clientX, clientY } = e
    const { x: canvasX, y: canvasY } = trackPointInCanvas(clientX, clientY);

    canvasCtx.lineCap = "round"
    canvasCtx.lineWidth = 10

    if (!currentVertex) {
      canvasCtx.beginPath(canvasX, canvasY);
      canvasCtx.moveTo(canvasX, canvasY);
    } else {
      canvasCtx.lineTo(canvasX, canvasY)
      canvasCtx.stroke();
    }

    setCurrentVertex({ vertexX: canvasX, vertexY: canvasY });
  }

  const finishPolygon = () => {
    canvasCtx.closePath();
    canvasCtx.stroke();

    const image = canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
    setPolygons([...polygons, image])
    setCurrentVertex(null);
    clearCanvas()
  }

  const clearCanvas = () => {
    setCurrentVertex(null);
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  const trackPointInCanvas = (windowX, windowY) => {
    if (!canvasRef) return null;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const { left, top } = canvasRect;
    return {
      x: windowX - left,
      y: windowY - top,
    }
  }

  return (
    <div className="app">
      <h2 className="title">Polygon Drawing</h2>

      <div className="app__canvas-section">
        <canvas 
          onMouseDown={createVertex}
          ref={canvasRef}
          className="canvas" 
          height={canvasHeight} 
          width={canvasWidth} 
        />
      </div>
      <div className="app__options">
        <ActionButton icon={<RiEditLine size="20" />} text="Complete Polygon" onClick={finishPolygon}/>
        <ActionButton icon={<RiRestartLine size="20" />} text="Reset" onClick={clearCanvas}/>
      </div>
      <div>
        <h2 className="title">Your Saved Polygons</h2>
        <div className="polygons-container">
            {polygons.map((polygonSrc, index) => <PolygonImage image={polygonSrc} key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
