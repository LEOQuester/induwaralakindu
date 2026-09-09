export function renderFlowBridge({ label = '' } = {}) {
  return `
    <div class="flow-bridge" aria-hidden="true">
      <span class="flow-bridge__orb"></span>
      <span class="flow-bridge__line"></span>
      ${label ? `<span class="flow-bridge__label">${label}</span>` : ''}
      <span class="flow-bridge__line"></span>
      <span class="flow-bridge__orb flow-bridge__orb--end"></span>
    </div>
  `;
}
