/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

TOMEE.ApplicationTabLog = function () {
    "use strict";

    var channel = TOMEE.ApplicationChannel,
        container = $(TOMEE.ApplicationTemplates.getValue('application-tab-log', {}));

    channel.bind('server-callback', 'GetLog', function (params) {
        if (!params.data.success) {
            return;
        }

        var logFiles = container.find('.tomee-log-files');
        logFiles.empty();

        TOMEE.utils.forEach(params.data.output.files, function (value) {
            var file = $(TOMEE.ApplicationTemplates.getValue('application-tab-log-file', {
                file:value
            }));
            file.on('click', function () {
                channel.send('ui-actions', 'log-file-selected', {
                    file:value
                });
            });
            logFiles.append(file);
        });
    });

    channel.bind('ui-actions', 'log-file-selected', function (param) {
        var fileName = container.find('.log-file-name');
        fileName.html(param.file);
    });

    return {
        getEl:function () {
            return container;
        },
        onAppend:function () {
        },
        onDetach:function () {
        }
    };
};