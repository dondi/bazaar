import UIKit

@IBDesignable class SwivelControl: UIControl {
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

    override func beginTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
        currentTouch = touch
        anchorX = touch.location(in: self).x - swivelAngle
        return true
    }

    override func continueTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
        // Make sure we are following the same finger.
        if touch != currentTouch {
            return false
        }

        let newAngle = touch.location(in: self).x - anchorX
        swivelAngle = newAngle

        // Thank you https://stackoverflow.com/questions/347721/how-do-i-apply-a-perspective-transform-to-a-uiview
        var rotationAndPerspectiveTransform = CATransform3DIdentity
        rotationAndPerspectiveTransform.m34 = 1.0 / -500
        rotationAndPerspectiveTransform = CATransform3DRotate(rotationAndPerspectiveTransform,
            swivelAngle * .pi / 180.0, 0.0, 1.0, 0.0)

        layer.sublayerTransform = rotationAndPerspectiveTransform

        // Model changed, so we update the view and send out updates to other controllers.
        setNeedsDisplay()
        sendActions(for: .valueChanged)
        return true
    }

    override func endTracking(_ touch: UITouch?, with event: UIEvent?) {
        if touch == currentTouch {
            // Release the touch, indicating the end of this particular touch sequence.
            cancelTracking(with: event)
        }
    }

    override func cancelTracking(with event: UIEvent?) {
        currentTouch = nil
    }
}
