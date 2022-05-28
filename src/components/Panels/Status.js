/*
 Status.js - ESP3D WebUI component file

 Copyright (c) 2021 Luc LEBOSSE. All rights reserved.

 This code is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.
 This code is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.
 You should have received a copy of the GNU Lesser General Public
 License along with This code; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

import { Fragment, h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import { T } from "../Translations"
import { Layers } from "preact-feather"
import { useUiContext, useUiContextFn } from "../../contexts"
import { useTargetContext } from "../../targets"

/*
 * Local const
 *
 */

const StatusControls = () => {
    const { status } = useTargetContext()
    if (!useUiContextFn.getValue("showstatuspanel")) return null
    return (
        <Fragment>
            {status.printState.status != "Unknown" && (
                <div class="status-ctrls">
                    <div
                        class="extra-control mt-1 tooltip tooltip-bottom"
                        data-tooltip={T("P97")}
                    >
                        <div class="extra-control-header">
                            {status.printState.status}
                        </div>
                        {status.filename.length > 0 && (
                            <div class="extra-control-value">
                                {status.filename}
                            </div>
                        )}
                        <div class="extra-control-value">
                            {status.printState.progress}%
                        </div>
                    </div>
                </div>
            )}
            {status.state.length > 0 && (
                <div class="status-ctrls">
                    <div
                        class="status-control mt-1 tooltip tooltip-bottom"
                        data-tooltip={T("P67")}
                    >
                        <div class="status-control-header">{T("P67")}</div>
                        <div class="status-control-value">{status.state}</div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

const StatusPanel = () => {
    const { panels, uisettings } = useUiContext()
    const { status } = useTargetContext()

    const id = "statusPanel"
    const hidePanel = () => {
        useUiContextFn.haptic()
        panels.hide(id)
    }

    console.log("Status panel")

    return (
        <div class="panel panel-dashboard">
            <div class="navbar">
                <span class="navbar-section feather-icon-container">
                    <Layers />
                    <strong class="text-ellipsis">{T("P97")}</strong>
                </span>
                <span class="navbar-section">
                    <span style="height: 100%;">
                        <span
                            class="btn btn-clear btn-close m-1"
                            aria-label="Close"
                            onclick={hidePanel}
                        />
                    </span>
                </span>
            </div>
            <div class="panel-body panel-body-dashboard">
                <StatusControls />
            </div>
        </div>
    )
}

const StatusPanelElement = {
    id: "statusPanel",
    content: <StatusPanel />,
    name: "P97",
    icon: "Layers",
    show: "showstatuspanel",
    onstart: "openstatusonstart",
}

export { StatusPanel, StatusPanelElement, StatusControls }
