import { test, expect } from '@playwright/test'

test.describe('BMI Calculator Click-to-Edit Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Visual Indicators', () => {
    test('should show cursor pointer and hover effects on number display', async ({ page }) => {
      // Test weight input hover
      const weightValue = page.locator('[data-testid="weight-value"]').or(
        page.locator('label:has-text("Weight") + div span:first-of-type')
      )
      
      await weightValue.hover()
      await expect(weightValue).toHaveClass(/cursor-pointer/)
      
      // Test that edit icon is visible
      const editIcon = weightValue.locator('svg')
      await expect(editIcon).toBeVisible()
    })

    test('should show hover background color change', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      
      // Check initial state
      await expect(weightValue).not.toHaveClass(/bg-blue-50/)
      
      // Hover and check background change
      await weightValue.hover()
      await expect(weightValue).toHaveClass(/hover:bg-blue-50/)
    })

    test('should have proper accessibility attributes', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      
      await expect(weightValue).toHaveAttribute('aria-label', /click to edit weight/i)
      await expect(weightValue).toHaveAttribute('title', /click to edit weight/i)
    })
  })

  test.describe('Click Activation', () => {
    test('should enter edit mode when clicking on weight value', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      // Initially, input should not be visible
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      // Click on the value
      await weightValue.click()
      
      // After click, input should be visible and span hidden
      await expect(weightInput).toBeVisible()
      await expect(weightInput).toBeFocused()
      await expect(weightValue).not.toBeVisible()
      
      // Input should have the current value selected
      const inputValue = await weightInput.inputValue()
      expect(parseFloat(inputValue)).toBeGreaterThan(0)
    })

    test('should enter edit mode when clicking on height value', async ({ page }) => {
      const heightValue = page.locator('label:has-text("Height") + div span:first-of-type')
      const heightInput = page.locator('label:has-text("Height") + div input[type="number"]')
      
      await heightValue.click()
      
      await expect(heightInput).toBeVisible()
      await expect(heightInput).toBeFocused()
      await expect(heightValue).not.toBeVisible()
    })

    test('should enter edit mode when clicking on BMI value', async ({ page }) => {
      // Switch to weight target so BMI input is visible
      await page.locator('text=Weight').click()
      
      const bmiValue = page.locator('label:has-text("Target BMI") + div span:first-of-type')
      const bmiInput = page.locator('label:has-text("Target BMI") + div input[type="number"]')
      
      await bmiValue.click()
      
      await expect(bmiInput).toBeVisible()
      await expect(bmiInput).toBeFocused()
      await expect(bmiValue).not.toBeVisible()
    })
  })

  test.describe('Keyboard Input and Validation', () => {
    test('should accept valid input and update value on Enter', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      // Get initial value
      const initialText = await weightValue.textContent()
      const initialValue = parseFloat(initialText?.replace(/[^\d.]/g, '') || '0')
      
      // Enter edit mode
      await weightValue.click()
      
      // Input new valid value
      const newValue = initialValue + 5
      await weightInput.fill(String(newValue))
      await weightInput.press('Enter')
      
      // Should exit edit mode and update value
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      const updatedText = await weightValue.textContent()
      const updatedValue = parseFloat(updatedText?.replace(/[^\d.]/g, '') || '0')
      expect(Math.abs(updatedValue - newValue)).toBeLessThan(0.1)
    })

    test('should clamp values to minimum bounds', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      await weightValue.click()
      
      // Input value below minimum (30kg)
      await weightInput.fill('10')
      await weightInput.press('Enter')
      
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      // Value should be clamped to minimum
      const updatedText = await weightValue.textContent()
      const updatedValue = parseFloat(updatedText?.replace(/[^\d.]/g, '') || '0')
      expect(updatedValue).toBeGreaterThanOrEqual(30)
    })

    test('should clamp values to maximum bounds', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      await weightValue.click()
      
      // Input value above maximum (200kg)
      await weightInput.fill('300')
      await weightInput.press('Enter')
      
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      // Value should be clamped to maximum
      const updatedText = await weightValue.textContent()
      const updatedValue = parseFloat(updatedText?.replace(/[^\d.]/g, '') || '0')
      expect(updatedValue).toBeLessThanOrEqual(200)
    })

    test('should handle invalid input by reverting to original value', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      // Get initial value
      const initialText = await weightValue.textContent()
      
      await weightValue.click()
      
      // Input invalid value
      await weightInput.fill('abc')
      await weightInput.press('Enter')
      
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      // Value should remain unchanged
      const finalText = await weightValue.textContent()
      expect(finalText).toBe(initialText)
    })
  })

  test.describe('Cancel and Escape Functionality', () => {
    test('should cancel edit mode with Escape key', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      const initialText = await weightValue.textContent()
      
      // Enter edit mode and change value
      await weightValue.click()
      await weightInput.fill('999')
      
      // Press Escape to cancel
      await weightInput.press('Escape')
      
      // Should exit edit mode without saving
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      const finalText = await weightValue.textContent()
      expect(finalText).toBe(initialText)
    })

    test('should save value when clicking outside (blur)', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      const initialText = await weightValue.textContent()
      const initialValue = parseFloat(initialText?.replace(/[^\d.]/g, '') || '0')
      
      // Enter edit mode
      await weightValue.click()
      
      // Change value
      const newValue = initialValue + 3
      await weightInput.fill(String(newValue))
      
      // Click outside to trigger blur
      await page.locator('label:has-text("Height")').click()
      
      // Should save the value
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
      
      const finalText = await weightValue.textContent()
      const finalValue = parseFloat(finalText?.replace(/[^\d.]/g, '') || '0')
      expect(Math.abs(finalValue - newValue)).toBeLessThan(0.1)
    })
  })

  test.describe('Mobile Touch Testing', () => {
    test('should work on mobile devices', async ({ page, browserName }) => {
      // Skip webkit for this test as it has different mobile behavior
      test.skip(browserName === 'webkit', 'Webkit mobile behavior differs')
      
      // Emulate mobile device
      await page.setViewportSize({ width: 375, height: 667 })
      
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      // Touch the value
      await weightValue.tap()
      
      // Should enter edit mode
      await expect(weightInput).toBeVisible()
      await expect(weightInput).toBeFocused()
      
      // Input should have numeric keyboard (this is browser-dependent)
      await expect(weightInput).toHaveAttribute('type', 'number')
    })
  })

  test.describe('Integration with Slider', () => {
    test('should update slider when direct input changes', async ({ page }) => {
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      const weightSlider = page.locator('label:has-text("Weight") ~ div input[type="range"]')
      
      // Get initial slider value
      const initialSliderValue = await weightSlider.getAttribute('value')
      
      // Change value via direct input
      await weightValue.click()
      await weightInput.fill('85')
      await weightInput.press('Enter')
      
      // Slider should update
      const updatedSliderValue = await weightSlider.getAttribute('value')
      expect(updatedSliderValue).not.toBe(initialSliderValue)
      expect(parseFloat(updatedSliderValue || '0')).toBe(85)
    })
  })

  test.describe('Disabled State', () => {
    test('should not be clickable when disabled', async ({ page }) => {
      // Switch to height target to disable weight input
      await page.locator('text=Height').click()
      
      const weightValue = page.locator('label:has-text("Weight") + div span:first-of-type')
      const weightInput = page.locator('label:has-text("Weight") + div input[type="number"]')
      
      // Value should have opacity-50 class when disabled
      await expect(weightValue).toHaveClass(/opacity-50/)
      
      // Clicking should not enter edit mode
      await weightValue.click()
      await expect(weightInput).not.toBeVisible()
      await expect(weightValue).toBeVisible()
    })
  })
})