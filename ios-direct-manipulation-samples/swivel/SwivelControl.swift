import UIKit

@IBDesignable class SwivelControl: UIView {
    // The component's model.
    var currentTouch: UITouch? = nil
    var anchorX: CGFloat = 0
    var swivelAngle: CGFloat = 0

    // We will manipulate a drawing layer as the component's "view."
    var swivelLayer = CALayer()

    // The "inspectable" properties of the view will allow editing via Xcode!
    @IBInspectable var swivelBorderColor: UIColor = .black {
        didSet {
            layoutSubviews()
        }
    }

    @IBInspectable var swivelBorderWidth: Int = 1 {
        didSet {
            layoutSubviews()
        }
    }

    @IBInspectable var swivelBackgroundColor: UIColor = .white {
        didSet {
            layoutSubviews()
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        layoutSubviews()
    }

    required init(coder: NSCoder) {
        super.init(coder: coder)!
        layoutSubviews()
    }

    override func layoutSubviews() {
        swivelLayer.removeFromSuperlayer()
        swivelLayer.backgroundColor = swivelBackgroundColor.cgColor
        swivelLayer.borderColor = swivelBorderColor.cgColor
        swivelLayer.borderWidth = CGFloat(swivelBorderWidth)
        swivelLayer.frame = bounds
        layer.addSublayer(swivelLayer)
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        currentTouch = touches.first
        if let initiator = currentTouch {
            anchorX = initiator.location(in: self).x - swivelAngle
        }
    }

    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        for touch in touches {
            // Make sure we are following the same finger.
            if touch != currentTouch {
                continue
            }

            let newAngle = touch.location(in: self).x - anchorX
            swivelAngle = newAngle

            // Thank you https://stackoverflow.com/questions/347721/how-do-i-apply-a-perspective-transform-to-a-uiview
            var rotationAndPerspectiveTransform = CATransform3DIdentity
            rotationAndPerspectiveTransform.m34 = 1.0 / -500
            rotationAndPerspectiveTransform = CATransform3DRotate(rotationAndPerspectiveTransform,
                swivelAngle * .pi / 180.0, 0.0, 1.0, 0.0)

            layer.sublayerTransform = rotationAndPerspectiveTransform
            setNeedsDisplay()
        }
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        for touch in touches {
            if touch != currentTouch {
                continue
            }

            // Release the touch, indicating the end of this particular touch sequence.
            currentTouch = nil
        }
    }
}
